const Web3 = require("web3")
const path = require("path")
const fs = require("fs")

const votePath = path.resolve(__dirname,"../build/contracts","Vote.json")

let web3:any, contract:any, contractAddress:any, abi:any;

  if (fs.existsSync(votePath)){

          const source  = fs.readFileSync(votePath,"UTF-8")

          const voteJson = JSON.parse(source);
      
          contractAddress = voteJson['address']
          abi = voteJson['jsonInterface']
          
          web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545")
          contract = new web3.eth.Contract(abi,contractAddress,{handleRevert: true})
          

  }

export { web3, contract, abi, contractAddress };

