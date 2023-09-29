"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dvote = void 0;
var path = require("path");
var fs = require("fs");
var solc = require("solc");
var Web3 = require('web3');
var HDWalletProvider = require("@truffle/hdwallet-provider");
var createVote_1 = require("./Methods/createVote");
var addVote_1 = require("./Methods/addVote");
var voteResult_1 = require("./Methods/voteResult");
var changeVote_1 = require("./Methods/changeVote");
var Dvote = /** @class */ (function () {
    function Dvote(account, endpointUrl) {
        this.web3 = new Web3(endpointUrl);
        this.adminAccount = account;
        this.development = false;
        var votePath = path.join(process.cwd(), "./node_modules/dvote-polygon/contracts", "Vote.json");
        if (fs.existsSync(votePath)) {
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
    Dvote.prototype.deploy = function (abi, bytecode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var deployContract = function () {
                var contract = new _this.web3.eth.Contract(abi);
                contract.deploy({ data: bytecode }).send({ from: _this.adminAccount, gas: 4000000,
                    gasPrice: '30000000000' }).then(function (result) {
                    result.options['ByteCode'] = this.compile().bytecode();
                    if (this.development) {
                        var filepath = path.join(process.cwd(), "./node_modules/dvote-polygon/contracts", "Vote.json");
                        fs.writeFile(filepath, JSON.stringify(result.options), function (err) {
                            if (err)
                                throw err;
                            else
                                resolve("deployed contract Saved into Vote.json file");
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
            };
            if (typeof _this.contractAddress === "undefined") {
                return deployContract();
            }
            else {
                if (!_this.development) {
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