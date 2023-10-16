"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVoteCall = void 0;
var checkTrxError_1 = require("./error/checkTrxError");
function createVoteCall(web3, contract, abi, contractAddress, voteName, candidate, adminAccount, gasFee, gasPrice) {
    return new Promise(function (resolve, reject) {
        contract.methods.createVote(voteName, candidate).send({ from: adminAccount,
            gas: gasFee, gasPrice: gasPrice })
            .on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (receipt.status === false) {
                (0, checkTrxError_1.checkTrxError)(web3, receipt.transactionHash, receipt.blockNumber);
            }
            else {
                resolve("create vote successful: " + JSON.stringify(receipt));
            }
        }).catch(function (error) {
            resolve("Error: " + error.reason);
        });
    });
}
exports.createVoteCall = createVoteCall;
//# sourceMappingURL=createVote.js.map