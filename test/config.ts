const Web3 = require("web3")
const path = require("path")
const fs = require("fs")
const dvote = require("../src/Dvote")
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;

const dv = new dvote(mnemonic,"http://127.0.0.1:8545")

dv.development = true

const votePath = path.resolve(__dirname,"../build/contracts","Vote-test.json")

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545")

let contract:any = null, contractAddress:any=null, abi:any=null;

function loadContract(){
  if (fs.existsSync(votePath)){

          const source  = fs.readFileSync(votePath,"UTF-8")

          const voteJson = JSON.parse(source);
      
          contractAddress = voteJson['address']
          abi = voteJson['jsonInterface']
              
          contract = new web3.eth.Contract(abi,contractAddress,{handleRevert: true})
          
       
  }
}

export { dv, web3, contract, abi, contractAddress, loadContract };

