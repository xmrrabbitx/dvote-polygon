"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteResultCall = void 0;
function voteResultCall(web3, contract, abi, contractAddress, voteName, adminAccount) {
    return new Promise(function (resolve, reject) {
        contract.methods.voteResult(voteName).call({ from: adminAccount }).then(function (result) {
            var outputFilter = result.map(function (_a) {
                var name = _a[0], votes = _a[1], rest = _a[2];
                return (__assign({ name: name, votes: votes }, rest));
            });
            resolve(outputFilter);
        }).catch(function (error, receipt) {
            reject("Error: " + error.reason);
        });
    });
}
exports.voteResultCall = voteResultCall;
//# sourceMappingURL=voteResult.js.map