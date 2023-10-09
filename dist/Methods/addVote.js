"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVoteCall = void 0;
function addVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress, adminAccount, gasFee, gasPrice) {
    return new Promise(function (resolve, reject) {
        contract.methods.addVote(voteName, candidate, fromAddress).send({
            from: adminAccount,
            gas: gasFee, gasPrice: gasPrice
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("Vote successful casted: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("Vote successful casted: " + JSON.stringify(receipt));
        }).catch(function (error) {
            resolve("Error: " + error.reason);
        });
    });
}
exports.addVoteCall = addVoteCall;
//# sourceMappingURL=addVote.js.map