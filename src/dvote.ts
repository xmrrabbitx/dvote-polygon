var path = require("path")
var fs = require("fs")
var solc = require("solc")
var Web3 = require('web3')
const HDWalletProvider = require("@truffle/hdwallet-provider")

import{ createVote } from "./Methods/createVote"
import{ addVote } from "./Methods/addVote"
import{ voteResult } from "./Methods/voteResult"

interface compiledContract {

  abi:()=>Array<JSON>,
  bytecode:()=>string

}


class Dvote {
       
    private provider:any
    private accounts:any
    private web3:any
    private ether:any
    private contractAddress:any
    private abi:any
    private contract:any
    private contractEther:any
    private signer:any

    constructor(mnemonic:any, endpointUrl:any){
      
      this.provider = new HDWalletProvider(mnemonic, endpointUrl)
      this.web3 = new Web3(Web3.givenProvider || this.provider)
      

      const votePath = path.resolve(__dirname,"../build/contracts","Vote.json")

      if (fs.existsSync(votePath)){
        const source  = fs.readFileSync(votePath,"UTF-8")

        const voteJson = JSON.parse(source);
  
        
        this.contractAddress = voteJson['address']
        this.abi = voteJson['jsonInterface']

        this.contract = new this.web3.eth.Contract(this.abi,this.contractAddress,{handleRevert: true})
        

      }
     
       
    }
    compile():compiledContract{
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
            gasPrice: '30000000000',}).then(function(result: { options: any }){
              
            result.options['ByteCode'] = this.compile().bytecode();
              
              fs.writeFile("build/contracts/Vote.json",JSON.stringify(result.options),function (err: any) {
                if (err) throw err
                else resolve("deployed contract Saved into Vote.json file")
              })

          }.bind(this)) 
         
          
        }
        
        if(typeof this.contractAddress === "undefined"){
          
          return deployContract();
          
        }else{
        
          this.web3.eth.getCode(this.contractAddress, (error, code) => {

            if (error) {

                  return error;

            } else if (code === '0x') {
              
                  return deployContract();

            } else {
                 
                  resolve(`the Contract already deployed and exists at address ${this.contractAddress}`);

            }
          });
        
        }
      
      })

 
      
    }

    createVote(voteName:string, candidate:any, fromAccount:any){
       
      return new Promise((resolve,reject)=>{

        createVote(this.web3, this.contract, this.abi, this.contractAddress, voteName, candidate, fromAccount).then(result=>{

          resolve(result)

        }).catch(error=>{

          reject(error)
        })

      })

    }

    addVote(voteName:string, candidate:string, fromAccount:any){

      return new Promise((resolve,reject)=>{

        addVote(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAccount).then(result=>{

          resolve(result)

        }).catch(error=>{

          reject(error)
        })

      })

    }

    voteResult(voteName:string, fromAccount:any){

      return voteResult(this.web3, this.contract, this.abi,this.contractAddress, voteName, fromAccount)
 
     }


  }
  
module.exports = Dvote;
  