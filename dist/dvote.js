"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvote = void 0;
var path = require("path");
var fs = require("fs");
var solc = require("solc");
var Web3 = require('web3');
var dotenv = require("dotenv");
var createVote_1 = require("./Methods/createVote");
var addVote_1 = require("./Methods/addVote");
var voteResult_1 = require("./Methods/voteResult");
var changeVote_1 = require("./Methods/changeVote");
var Dvote = /** @class */ (function () {
    function Dvote(endpointUrl, renew, devMode) {
        if (renew === void 0) { renew = false; }
        if (devMode === void 0) { devMode = false; }
        this.web3 = new Web3(endpointUrl);
        this.devMode = devMode;
        if (!this.devMode) {
            dotenv.config();
            var privateKey = process.env.PRIVATE_KEY;
            console.log(dotenv.config());
            this.signer = this.web3.eth.accounts.privateKeyToAccount(privateKey);
            this.web3.eth.accounts.wallet.add(this.signer);
            this.adminAccount = this.signer['address'];
        }
        var votePath = path.join(process.cwd(), "./node_modules/dvote-polygon/contracts", "Vote.json");
        if (fs.existsSync(votePath) && !renew) {
            var source = fs.readFileSync(votePath, "UTF-8");
            var voteJson = JSON.parse(source);
            this.contractAddress = voteJson['address'];
            this.abi = voteJson['jsonInterface'];
            this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress, { handleRevert: true });
        }
    }
    Dvote.prototype.compile = function () {
        var solPath = path.join(process.cwd(), "./node_modules/dvote-polygon/contracts", "Vote.sol");
        var source = fs.readFileSync(solPath, "UTF-8");
        var input = {
            language: 'Solidity',
            sources: {
                'Vote.sol': {
                    content: source,
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['abi', 'evm.bytecode'],
                    },
                },
            },
        };
        var compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
        return {
            abi: function () {
                return compiledContract['contracts']['Vote.sol']['Vote']['abi'];
            },
            bytecode: function () {
                return "0x" + compiledContract['contracts']['Vote.sol']['Vote']['evm']['bytecode']['object'];
            }
        };
    };
    Dvote.prototype.deploy = function (abi, bytecode, gasFeeOptional, gasPriceOptional) {
        var _this = this;
        if (gasFeeOptional === void 0) { gasFeeOptional = null; }
        if (gasPriceOptional === void 0) { gasPriceOptional = null; }
        return new Promise(function (resolve, reject) {
            var deployContract = function () {
                var contract = new _this.web3.eth.Contract(abi);
                var contractData = {
                    data: bytecode,
                    from: _this.signer.address,
                };
                _this.web3.eth.estimateGas(contractData)
                    .then(function (gasFee) {
                    _this.web3.eth.getGasPrice()
                        .then(function (gasPrice) {
                        gasFee = gasFeeOptional ? gasFeeOptional : gasFee;
                        gasPrice = gasPriceOptional ? gasPriceOptional : gasPrice;
                        contract.deploy({ data: bytecode }).send({ from: _this.signer.address, gas: gasFee,
                            gasPrice: gasPrice }).then(function (result) {
                            if (this.devMode) {
                                var filepath = path.join(process.cwd(), "./node_modules/dvote-polygon/build/contracts", "Vote-test.json");
                                fs.writeFile(filepath, JSON.stringify(result.options), function (err) {
                                    if (err)
                                        throw err;
                                    else
                                        resolve("deployed contract Saved into Vote-test.json file!");
                                });
                            }
                            else {
                                var filepath = path.join(process.cwd(), "./node_modules/dvote-polygon/contracts", "Vote.json");
                                fs.writeFile(filepath, JSON.stringify(result.options), function (err) {
                                    if (err)
                                        throw err;
                                    else
                                        resolve("deployed contract Saved into Vote.json file");
                                });
                            }
                        }.bind(_this)).catch(function (error) {
                            reject(error);
                        });
                    })
                        .catch(function (error) {
                        reject(error);
                    });
                })
                    .catch(function (error) {
                    reject(error);
                });
            };
            if (typeof _this.contractAddress === "undefined") {
                return deployContract();
            }
            else {
                if (!_this.devMode) {
                    _this.web3.eth.getCode(_this.contractAddress, function (error, code) {
                        if (error) {
                            reject(error);
                        }
                        else if (code === '0x') {
                            return deployContract();
                        }
                        else {
                            resolve("the Contract already deployed and exists at address ".concat(_this.contractAddress));
                        }
                    });
                }
                else {
                    return deployContract();
                }
            }
        });
    };
    Dvote.prototype.createVote = function (voteName, candidate) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, createVote_1.createVoteCall)(_this.web3, _this.contract, _this.abi, _this.contractAddress, voteName, candidate, _this.adminAccount).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Dvote.prototype.addVote = function (voteName, candidate, fromAddress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, addVote_1.addVoteCall)(_this.web3, _this.contract, _this.abi, _this.contractAddress, voteName, candidate, fromAddress, _this.adminAccount).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Dvote.prototype.changeVote = function (voteName, candidate, fromAddress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, changeVote_1.changeVoteCall)(_this.web3, _this.contract, _this.abi, _this.contractAddress, voteName, candidate, fromAddress).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Dvote.prototype.voteResult = function (voteName) {
        return (0, voteResult_1.voteResultCall)(this.web3, this.contract, this.abi, this.contractAddress, voteName, this.adminAccount);
    };
    return Dvote;
}());
exports.Dvote = Dvote;
//# sourceMappingURL=dvote.js.map