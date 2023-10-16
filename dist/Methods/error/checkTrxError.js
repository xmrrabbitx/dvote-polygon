"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTrxError = void 0;
function checkTrxError(web3, trx, blockNumber) {
    return new Promise(function (resolve, reject) {
        web3.eth.getTransaction(trx, blockNumber).then(function (error) {
            reject(error.reason);
        });
    });
}
exports.checkTrxError = checkTrxError;
//# sourceMappingURL=checkTrxError.js.map