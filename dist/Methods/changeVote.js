"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVoteCall = void 0;
function changeVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress) {
    return new Promise(function (resolve, reject) {
        contract.methods.changeVote(voteName, candidate, fromAddress).send({
            from: fromAddress,
            gas: 3000000,
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("Vote changing casted: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("Vote changing casted: " + JSON.stringify(receipt));
        });
    });
}
exports.changeVoteCall = changeVoteCall;
//# sourceMappingURL=changeVote.js.map