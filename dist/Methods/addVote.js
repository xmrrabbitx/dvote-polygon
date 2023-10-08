"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVoteCall = void 0;
function addVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress, adminAccount) {
    return new Promise(function (resolve, reject) {
        contract.methods.addVote(voteName, candidate, fromAddress).send({
            from: adminAccount,
            gas: 3000000,
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("Vote successful casted: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("Vote successful casted: " + JSON.stringify(receipt));
        });
    });
}
exports.addVoteCall = addVoteCall;
//# sourceMappingURL=addVote.js.map