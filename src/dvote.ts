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
    private adminAccount:string
    private web3:any
    private contractAddress:any
    private abi:Array<JSON>
    private contract:any
    private signer:any
    private gasFee:number
    private gasPrice:string
    public renewContract:boolean
    private bytecode:string
    private deployed:boolean;

    constructor(endpointUrl:string, renewContract=false){

      this.web3 = new Web3(endpointUrl)

      dotenv.config();
      const privateKey = process.env.PRIVATE_KEY;
      this.signer = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this.web3.eth.accounts.wallet.add(this.signer);
      
      this.adminAccount = this.signer['address'];
      
      const votePath = path.join( process.cwd(), "./node_modules/dvote-polygon/contracts","Vote.json")
     
      this.renewContract = renewContract;
      if (fs.existsSync(votePath) && this.renewContract === false){
 
        const source  = fs.readFileSync(votePath,"UTF-8")
        const voteJson = JSON.parse(source)
 
        this.contractAddress = voteJson['address']
        this.abi = voteJson['jsonInterface']
        this.bytecode = voteJson['bytecode']

        this.contract = new this.web3.eth.Contract(this.abi,this.contractAddress,{handleRevert: true})
  
        this.deployed = true;
      }else{
        this.deployed = false;
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
        
          var contract = new this.web3.eth.Contract(abi,{handleRevert: true})

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
                      
                      var json:any = JSON.stringify(result.options);
                      var jsonObject = JSON.parse(json);
                      jsonObject.bytecode = bytecode;
                      var newJsonString = JSON.stringify(jsonObject);

                      const filepath = path.join( process.cwd(), "./node_modules/dvote-polygon/contracts","Vote.json")
                      fs.writeFile(filepath,newJsonString,function (err: any) {
                        
                        if (err) throw err
                        else resolve("deployed contract Saved into Vote.json file")
                      })
                    
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
          
            this.web3.eth.getCode(this.contractAddress, (error:any, code:any) => {

              if (error) {

                    reject(error)

              } else if (code === '0x') {
                
                    return deployContract();

              } else {
                  
                    resolve(`the Contract already deployed and exists at address ${this.contractAddress}`);

              }
            });
          
        }
      })
    }

    createVote(voteName:string, candidate:string[], gasFeeOptional:number=null, gasPriceOptional:string=null){
     
      return new Promise((resolve,reject)=>{

        if(this.deployed==true){

          const contractData = {
            data: this.bytecode,
            from: this.signer.address,
          };
          this.web3.eth.estimateGas(contractData)
            .then((gasFee:number) => {
            
              this.web3.eth.getGasPrice()
                .then((gasPrice:string) => { 

                  gasFee = gasFeeOptional ? gasFeeOptional : gasFee;
                  gasPrice = gasPriceOptional ? gasPriceOptional : gasPrice;
    
                  createVoteCall(this.web3, this.contract, this.abi, this.contractAddress, voteName, candidate, this.adminAccount, gasFee, gasPrice).then(result=>{
      
                  resolve(result)

                })
              })

          }).catch((error:any)=>{

            reject(error)
          })

        }else{

          reject("there is no contract. please deploy your contract!")
        
        }

      })

    }

    addVote(voteName:string, candidate:string, fromAddress:string, gasFeeOptional:number=null, gasPriceOptional:string=null){

      return new Promise((resolve,reject)=>{
        
        if(this.deployed==true){
          const contractData = {
            data: this.bytecode,
            from: this.signer.address,
          };
          this.web3.eth.estimateGas(contractData)
            .then((gasFee:number) => {
            
              this.web3.eth.getGasPrice()
                .then((gasPrice:string) => { 

                  gasFee = gasFeeOptional ? gasFeeOptional : gasFee;
                  gasPrice = gasPriceOptional ? gasPriceOptional : gasPrice;
    
                addVoteCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAddress, this.adminAccount, gasFee, gasPrice).then(result=>{

                  resolve(result)

              })
            })

          }).catch((error:any)=>{

            reject(error)
          })
        }else{

          reject("there is no contract. please deploy your contract!")
        
        }
      })

    }

    changeVote(voteName:string, candidate:string, fromAddress:string, gasFeeOptional:number=null, gasPriceOptional:string=null){
      return new Promise((resolve,reject)=>{
        if(this.deployed==true){
          const contractData = {
            data: this.bytecode,
            from: this.signer.address,
          };
          this.web3.eth.estimateGas(contractData)
            .then((gasFee:number) => {
            
              this.web3.eth.getGasPrice()
                .then((gasPrice:string) => { 

                  gasFee = gasFeeOptional ? gasFeeOptional : gasFee;
                  gasPrice = gasPriceOptional ? gasPriceOptional : gasPrice;
    
                  changeVoteCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAddress, gasFee, gasPrice).then(result=>{

                    resolve(result)
                })
              })

          }).catch((error:any)=>{

            reject(error)
          })
        }else{

          reject("there is no contract. please deploy your contract!")
        
        }
      })
    }

    voteResult(voteName:string){
        
      return new Promise((resolve,reject)=>{

          if(this.deployed==true){
            
            return voteResultCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, this.adminAccount).then(result=>{

              resolve(result)
              
            })
          
          }else{

            reject("there is no contract. please deploy your contract!")
        
          }
      })   
    } 
}