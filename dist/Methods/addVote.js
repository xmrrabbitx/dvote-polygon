"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVoteCall = void 0;
var checkTrxError_1 = require("./error/checkTrxError");
function addVoteCall(web3, contract, abi, contractAddress, voteName, candidate, fromAddress, adminAccount, gasFee, gasPrice) {
    return new Promise(function (resolve, reject) {
        contract.methods.addVote(voteName, candidate, fromAddress).send({
            from: adminAccount,
            gas: gasFee, gasPrice: gasPrice
        }).on('error', function (error, receipt) {
            reject("Error: " + error.reason);
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (receipt.status === false) {
                (0, checkTrxError_1.checkTrxError)(web3, receipt.transactionHash, receipt.blockNumber);
            }
            else {
                resolve("add vote successful: " + JSON.stringify(receipt));
            }
        }).catch(function (error) {
            resolve("Error: " + error.reason);
        });
    });
}
exports.addVoteCall = addVoteCall;
//# sourceMappingURL=addVote.js.map