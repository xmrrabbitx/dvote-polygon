import { dv, web3, contract, abi, contractAddress  } from "./config";

test('test 1: compile testing', async () => {

   let abi = dv.compile().abi()

   expect(abi).toBeInstanceOf(Array<JSON>)
   expect(abi.length).toBeGreaterThan(0)

   let bytecode = dv.compile().bytecode()

   expect(bytecode.length).toEqual(13186)

})