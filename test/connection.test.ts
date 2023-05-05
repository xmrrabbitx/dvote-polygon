const Web3 = require("web3")

const dvote = require("../src/dvote")

import { dv, web3, contract, abi, contractAddress } from "./config";

test('test 0: connection testing', async () => {

   let isListening = await dv.web3.eth.net.isListening()

   expect(isListening).toBe(true)

})
