import { dv, web3, contract, abi, contractAddress  } from "./config";

beforeEach(() => {
      jest.resetModules();
});

test('test 2: deploy testing', async () => {
     
      let fromAddress = await web3.eth.getAccounts()

      let abi = dv.compile().abi()
      let bytecode = dv.compile().bytecode()
      
      let deploy = await dv.deploy(fromAddress[0],abi,bytecode)
      
      expect(deploy).toMatch("deployed contract Saved into Vote-test.json file");

},70000)