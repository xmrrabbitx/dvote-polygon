"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoteCall = void 0;
function createVoteCall(web3, contract, abi, contractAddress, voteName, candidate, adminAccount) {
    return new Promise(function (resolve, reject) {
        contract.methods.createVote(voteName, candidate).send({ from: adminAccount,
            gas: 3000000 })
            .on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("successful transaction: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("successful transaction: " + JSON.stringify(receipt));
        });
    });
}
exports.createVoteCall = createVoteCall;
//# sourceMappingURL=createVote.js.map