import { dv, web3, contract, abi, contractAddress, loadContract  } from "./config";
import {createVoteCall} from "../src/Methods/createVote"
var randomstring = require("randomstring");

beforeEach(() => {
  jest.resetModules();
  loadContract()

});

let voteName:string,candidateName:[string,string,string];

test('test 3: createVote testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()

       voteName = randomstring.generate(5);
       candidateName = [randomstring.generate(7),randomstring.generate(7),randomstring.generate(7)];

      const data = await createVoteCall(web3, contract, abi, contractAddress, voteName, candidateName, fromAddress[0])

        let receipt:any = data
        let jsonStr = receipt.substring(receipt.indexOf('{'), receipt.lastIndexOf('}') + 1)
        let receiptJsonObj = JSON.parse(jsonStr)
       
        expect(receiptJsonObj.status).toBeTruthy()


})

export {voteName, candidateName};

