"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoteCall = void 0;
function createVoteCall(web3, contract, abi, contractAddress, voteName, candidate, adminAccount, gasFee, gasPrice) {
    return new Promise(function (resolve, reject) {
        contract.methods.createVote(voteName, candidate).send({ from: adminAccount,
            gas: gasFee, gasPrice: gasPrice })
            .on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            resolve("create vote successful: " + JSON.stringify(receipt));
        }).on('receipt', function (receipt) {
            resolve("create vote successful: " + JSON.stringify(receipt));
        }).catch(function (error) {
            resolve("Error: " + error.reason);
        });
    });
}
exports.createVoteCall = createVoteCall;
//# sourceMappingURL=createVote.js.map