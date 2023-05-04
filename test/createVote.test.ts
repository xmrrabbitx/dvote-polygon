import { dv, web3, contract, abi, contractAddress  } from "./config";
import {createVote} from "../src/Methods/createVote"
var randomstring = require("randomstring");

let voteName:string,candidateName:[string,string,string];

test('test 3: createVote testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()


       voteName = randomstring.generate(5);
       candidateName = [randomstring.generate(7),randomstring.generate(7),randomstring.generate(7)];

      const data = await createVote(web3, contract, abi, contractAddress, voteName, candidateName, fromAddress[1])
 
        let receipt:any = data
        let jsonStr = receipt.substring(receipt.indexOf('{'), receipt.lastIndexOf('}') + 1)
        let receiptJsonObj = JSON.parse(jsonStr)
       
        expect(receiptJsonObj.status).toBeTruthy()


})

export {voteName, candidateName};