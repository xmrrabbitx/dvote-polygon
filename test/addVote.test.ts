import {addVote} from '../src/Methods/addVote'
import { web3, contract, abi, contractAddress } from "../test/config";

test('test 1: addVote testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()
      
      return addVote(web3, contract, abi, contractAddress, "digikala", "sabon", fromAddress[1]).then(data=>{
          
        expect(data).toBeGreaterThan(0);  

      })
      
      
   
})