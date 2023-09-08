"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVoteCall = void 0;
function addVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress) {
    return new Promise(function (resolve, reject) {
        contract.methods.addVote(voteName, candidate, fromAddress).send({
            from: fromAddress,
            gas: 3000000,
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('receipt', function (receipt) {
            resolve("successful transaction: " + JSON.stringify(receipt));
        });
    });
}
exports.addVoteCall = addVoteCall;
//# sourceMappingURL=addVote.js.map