var path = require("path")
var fs = require("fs")
var solc = require("solc")
var Web3 = require('web3')

import{ createVote } from "./Methods/createVote"
import{ addVote } from "./Methods/addVote"
import{ voteResult } from "./Methods/voteResult"

interface compiledContract {

  abi:()=>Array<JSON>,
  bytecode:()=>string

}


class Dvote {
       
    private provider:any;
    private accounts:any;
    private web3:any;
    private contractAddress:any;
    private abi:any;
    private contract:any;

    constructor(provider:any){
      
      this.provider = provider;
      this.web3 = new Web3(Web3.givenProvider || this.provider);

      const votePath = path.resolve(__dirname,"../build/contracts","Vote.json");

      if (fs.existsSync(votePath)){
        const source  = fs.readFileSync(votePath,"UTF-8")

        const voteJson = JSON.parse(source);
  
        
        this.contractAddress = voteJson['address'];
        this.abi = voteJson['jsonInterface'];

        this.contract = new this.web3.eth.Contract(this.abi,this.contractAddress)
      }
     
       
    }
    compile():compiledContract{
      const craw = path.resolve(__dirname,"../contracts","Vote.sol");

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
      
      var contract = new this.web3.eth.Contract(abi)
      contract.deploy({data:bytecode}).send({from:fromAccount,gas: 4000000,
        gasPrice: '30000000000',}).then(function(result: { options: any }){

         result.options['ByteCode'] = this.compile().bytecode();
          
          fs.writeFile("build/contracts/Vote.json",JSON.stringify(result.options),function (err: any) {
            if (err) throw err;
            else return 'Saved!';
          })

        }.bind(this))  

    }

    createVote(voteName:string, candidate:any, fromAccount:any){
       
      createVote(this.web3, this.contract, this.abi, this.contractAddress, voteName, candidate, fromAccount);

    }

    addVote(voteName:string, candidate:any, fromAccount:any){

      addVote(this.web3, this.contract, this.abi,this.contractAddress, voteName, candidate, fromAccount);

    }

    voteResult(voteName:string, fromAccount:any){

      return voteResult(this.web3, this.contract, this.abi,this.contractAddress, voteName, fromAccount);
 
     }


  }
  
module.exports = Dvote;
  