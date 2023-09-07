const path = require("path")
const fs = require("fs")
const solc = require("solc")
const Web3 = require('web3')
const HDWalletProvider = require("@truffle/hdwallet-provider")

import{ createVoteCall } from "./Methods/createVote"
import{ addVoteCall } from "./Methods/addVote"
import{ voteResultCall } from "./Methods/voteResult"

export interface CompiledContract {

  abi:()=>Array<JSON>,
  bytecode:()=>string

}


export class Dvote {
       
    private provider:any
    private accounts:any
    public web3:any
    private ether:any
    private contractAddress:any
    private abi:any
    private contract:any
    private contractEther:any
    private signer:any
    public development:boolean

    constructor(mnemonic:any, endpointUrl:any){
   
      if(mnemonic == null){ 
        this.provider = endpointUrl
      }else{
        this.provider = new HDWalletProvider(mnemonic, endpointUrl)
      }

      this.web3 = new Web3(Web3.givenProvider || this.provider)
 
      this.development = false
      
      const votePath = path.resolve(__dirname,"../build/contracts","Vote.json")

      if (fs.existsSync(votePath)){
        const source  = fs.readFileSync(votePath,"UTF-8")

        const voteJson = JSON.parse(source);
  
        
        this.contractAddress = voteJson['address']
        this.abi = voteJson['jsonInterface']

        this.contract = new this.web3.eth.Contract(this.abi,this.contractAddress,{handleRevert: true})
        

      }
     
       
    }
    compile():CompiledContract{ 
      
      const craw = path.resolve(__dirname,"../contracts","Vote.sol")

      const source  = fs.readFileSync(craw,"UTF-8")

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

    deploy(fromAccount: any, abi: any, bytecode:any){

      return new Promise((resolve, reject) => {
        const deployContract = ()=>{
        
          var contract = new this.web3.eth.Contract(abi)
          
          contract.deploy({data:bytecode}).send({from:fromAccount,gas: 4000000,
            gasPrice: '30000000000'}).then(function(this:Dvote,result: { options: any }){
              
            result.options['ByteCode'] = this.compile().bytecode();
              
            if(this.development){
              
              const filepath = path.resolve(__dirname, '../build/contracts/Vote-test.json');
              fs.writeFile(filepath,JSON.stringify(result.options),function (err: any) {
                if (err) throw err
                else resolve("deployed contract Saved into Vote-test.json file")
              })
            }else{
              
              const filepath = path.resolve(__dirname, '../build/contracts/Vote.json');
              fs.writeFile(filepath,JSON.stringify(result.options),function (err: any) {
                if (err) throw err
                else resolve("deployed contract Saved into Vote.json file")
              })
            }
          }.bind(this)).catch((error:any)=>{

              reject(error)
          })
         
          
        }
        
        if(typeof this.contractAddress === "undefined"){
          
          return deployContract();
          
        }else{
          
          if(!this.development){

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

    createVote(voteName:string, candidate:any, fromAccount:any){
       
      return new Promise((resolve,reject)=>{

        createVoteCall(this.web3, this.contract, this.abi, this.contractAddress, voteName, candidate, fromAccount).then(result=>{

          resolve(result)

        }).catch((error:any)=>{

          reject(error)
        })

      })

    }

    addVote(voteName:string, candidate:string, fromAddress:any){

      return new Promise((resolve,reject)=>{

        addVoteCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAddress).then(result=>{

          resolve(result)

        }).catch((error:any)=>{

          reject(error)
        })

      })

    }

    voteResult(voteName:string, fromAccount:any){

      return voteResultCall(this.web3, this.contract, this.abi,this.contractAddress, voteName, fromAccount)
 
     }


  }
  