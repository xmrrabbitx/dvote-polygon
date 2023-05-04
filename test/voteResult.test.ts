import { dv, web3, contract, abi, contractAddress  } from "./config";
import {voteResult} from "../src/Methods/voteResult"
import {voteName, candidateName} from "./createVote.test"
var randomstring = require("randomstring");
const fs = require("fs")

test('test 5: voteResult testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()

      const data = await voteResult(web3, contract, abi, contractAddress, voteName, fromAddress[0])
 
      expect(data).toBeInstanceOf(Array)

      fs.unlink("build/contracts/Vote-test.json", (err) => {
            if (err) throw err;
          });
})