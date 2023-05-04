import { dv, web3, contract, abi, contractAddress  } from "./config";
import {addVote} from "../src/Methods/addVote"
import {voteName, candidateName} from "./createVote.test"
var randomstring = require("randomstring");

test('test 3: addVote testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()

      let rand = Math.floor(Math.random() * (2 - 0 + 1) + 0);

      const data = await addVote(web3, contract, abi, contractAddress, voteName, candidateName[rand], fromAddress[1])
 
        let receipt:any = data
        let jsonStr = receipt.substring(receipt.indexOf('{'), receipt.lastIndexOf('}') + 1)
        let receiptJsonObj = JSON.parse(jsonStr)
       
        expect(receiptJsonObj.status).toBeTruthy()


})