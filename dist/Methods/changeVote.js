"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVoteCall = void 0;
function changeVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress, gasFee, gasPrice) {
    return new Promise(function (resolve, reject) {
        contract.methods.changeVote(voteName, candidate, fromAddress).send({
            from: fromAddress,
            gas: gasFee, gasPrice: gasPrice
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("Vote changing casted: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("Vote changing casted: " + JSON.stringify(receipt));
        }).catch(function (error) {
            resolve("Error: " + error.reason);
        });
    });
}
exports.changeVoteCall = changeVoteCall;
//# sourceMappingURL=changeVote.js.map