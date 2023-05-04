import { dv, web3, contract, abi, contractAddress  } from "./config";
import {voteResult} from "../src/Methods/voteResult"
import {voteName, candidateName} from "./createVote.test"
var randomstring = require("randomstring");

test('test 4: voteResult testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()

      const data = await voteResult(web3, contract, abi, contractAddress, voteName, fromAddress[1])
 
       
      expect(data).toBeInstanceOf(Array)


})