const path = require("path")
const fs = require("fs")
const solc = require("solc")
const Web3 = require('web3')
const dotenv = require("dotenv");

import{ createVoteCall } from "./Methods/createVote"
import{ addVoteCall } from "./Methods/addVote"
import{ voteResultCall } from "./Methods/voteResult"
import { changeVoteCall } from "./Methods/changeVote"

export interface CompiledContract {

  abi:()=>Array<JSON>,
  bytecode:()=>string

}


export class Dvote {
       
    private provider:string
    private privateKey:string
    public adminAccount:string;
    public web3:any
    private contractAddress:any
    private abi:Array<JSON>
    private contract:any
    private signer:any
    private devMode:boolean
    private gasFee:number
    private gasPrice:string

    constructor(endpointUrl:string, renew=false, devMode=false){

      this.web3 = new Web3(endpointUrl)
      
      this.devMode = devMode

      if(!this.devMode){
        dotenv.config();
        const privateKey = process.env.PRIVATE_KEY;
        console.log(dotenv.config());
        this.signer = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        this.web3.eth.accounts.wallet.add(this.signer);
      
        this.adminAccount = this.signer['address'];

      }
      
      const votePath = path.join( process.cwd(), "./node_modules/dvote-polygon/contracts","Vote.json")

      if (fs.existsSync(votePath) && !renew){

        const source  = fs.readFileSync(votePath,"UTF-8")
        const voteJson = JSON.parse(source)
 
        this.contractAddress = voteJson['address']
        this.abi = voteJson['jsonInterface']

        this.contract = new this.web3.eth.Contract(this.abi,this.contractAddress,{handleRevert: true})

      }
     
       
    }


    compile():CompiledContract{ 

        const solPath = path.join( process.cwd(), "./node_modules/dvote-polygon/contracts","Vote.sol")
        const source  = fs.readFileSync(solPath,"UTF-8")

        const input = {
          language: 'Solidity',
          sources: {
            'Vote.sol': {
              content: source,
            },
          },
          settings: {
            outputSelection: {
              '*': {
                '*': ['abi', 'evm.bytecode'],
              },
            },
          },
        };
        
        const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
        
        return {
          abi:function(){ 

            return compiledContract['contracts']['Vote.sol']['Vote']['abi']
            

          },
          bytecode:function(){

            return "0x" + compiledContract['contracts']['Vote.sol']['Vote']['evm']['bytecode']['object']

          }
      
        }
      
    }
    
    deploy(abi: Array<JSON>, bytecode:string, gasFeeOptional:number=null, gasPriceOptional:string=null){
      
      return new Promise((resolve, reject) => {
        const deployContract = ()=>{
        
          var contract = new this.web3.eth.Contract(abi)

          const contractData = {
            data: bytecode,
            from: this.signer.address,
          };

          this.web3.eth.estimateGas(contractData)
          .then((gasFee:number) => {
           
            this.web3.eth.getGasPrice()
              .then((gasPrice:string) => { 
 
                gasFee = gasFeeOptional ? gasFeeOptional : gasFee;
                gasPrice = gasPriceOptional ? gasPriceOptional : gasPrice;

                  contract.deploy({data:bytecode}).send({from:this.signer.address, gas: gasFee,
                    gasPrice: gasPrice}).then(function(this:Dvote, result: { options: any }){
                      
                    if(this.devMode){

                      const filepath = path.join( process.cwd(), "./node_modules/dvote-polygon/build/contracts","Vote-test.json")
                      fs.writeFile(filepath,JSON.stringify(result.options),function (err: any) {
                        if (err) throw err
                        else resolve("deployed contract Saved into Vote-test.json file!")
                      })
                    }else{
                      
                      const filepath = path.join( process.cwd(), "./node_modules/dvote-polygon/contracts","Vote.json")
                      fs.writeFile(filepath,JSON.stringify(result.options),function (err: any) {
                        if (err) throw err
                        else resolve("deployed contract Saved into Vote.json file")
                      })
                    }
                  }.bind(this)).catch((error:any)=>{

                      reject(error)
                  })
                  
                })
                .catch(function (error:any) {
                    reject(error)
                });
            })
            .catch(function (error:any) {
                reject(error)
            });
         
          
        }
        
        if(typeof this.contractAddress === "undefined"){
          
          return deployContract();
          
        }else{
          
          if(!this.devMode){

            this.web3.eth.getCode(this.contractAddress, (error:any, code:any) => {

              if (error) {

                    reject(error)

              } else if (code === '0x') {
                
                    return deployContract();

              } else {
                  
                    resolve(`the Contract already deployed and exists at address ${this.contractAddress}`);

              }
            });
          }else{
            return  deployContract();
          }
        }
      })
    }

    createVote(voteName:string, candidate:string[]){
     
      return new Promise((resolve,reject)=>{
        
        createVoteCall(this.web3, this.contract, this.abi, this.contractAddress, voteName, candidate, this.adminAccount).then(result=>{
     
          resolve(result)

        }).catch((error:any)=>{

          reject(error)
        })

      })

    }

    addVote(voteName:string, candidate:string, fromAddress:string){

      return new Promise((resolve,reject)=>{

        addVoteCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAddress, this.adminAccount).then(result=>{

          resolve(result)

        }).catch((error:any)=>{

          reject(error)
        })

      })

    }

    changeVote(voteName:string, candidate:string, fromAddress:string){
      return new Promise((resolve,reject)=>{

        changeVoteCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAddress).then(result=>{

          resolve(result)

        }).catch((error:any)=>{

          reject(error)
        })

      })
    }

    voteResult(voteName:string){

      return voteResultCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, this.adminAccount)
 
     }

  }
  