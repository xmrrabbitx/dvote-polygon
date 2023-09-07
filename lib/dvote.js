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
var Dvote = /** @class */ (function () {
    function Dvote(mnemonic, endpointUrl) {
        console.log("start");
        if (mnemonic == null) {
            this.provider = endpointUrl;
        }
        else {
            this.provider = new HDWalletProvider(mnemonic, endpointUrl);
        }
        this.web3 = new Web3(Web3.givenProvider || this.provider);
        this.development = false;
        var votePath = path.resolve(__dirname, "../build/contracts", "Vote.json");
        if (fs.existsSync(votePath)) {
            var source = fs.readFileSync(votePath, "UTF-8");
            var voteJson = JSON.parse(source);
            this.contractAddress = voteJson['address'];
            this.abi = voteJson['jsonInterface'];
            this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress, { handleRevert: true });
        }
    }
    Dvote.prototype.compile = function () {
        console.log(__dirname);
        var craw = path.resolve(__dirname, "../contracts", "Vote.sol");
        var source = fs.readFileSync(craw, "UTF-8");
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
    Dvote.prototype.deploy = function (fromAccount, abi, bytecode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var deployContract = function () {
                var contract = new _this.web3.eth.Contract(abi);
                contract.deploy({ data: bytecode }).send({ from: fromAccount, gas: 4000000,
                    gasPrice: '30000000000' }).then(function (result) {
                    result.options['ByteCode'] = this.compile().bytecode();
                    if (this.development) {
                        var filepath = path.resolve(__dirname, '../build/contracts/Vote-test.json');
                        fs.writeFile(filepath, JSON.stringify(result.options), function (err) {
                            if (err)
                                throw err;
                            else
                                resolve("deployed contract Saved into Vote-test.json file");
                        });
                    }
                    else {
                        var filepath = path.resolve(__dirname, '../build/contracts/Vote.json');
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
    Dvote.prototype.createVote = function (voteName, candidate, fromAccount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, createVote_1.createVoteCall)(_this.web3, _this.contract, _this.abi, _this.contractAddress, voteName, candidate, fromAccount).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Dvote.prototype.addVote = function (voteName, candidate, fromAddress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, addVote_1.addVoteCall)(_this.web3, _this.contract, _this.abi, _this.contractAddress, voteName, candidate, fromAddress).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Dvote.prototype.voteResult = function (voteName, fromAccount) {
        return (0, voteResult_1.voteResultCall)(this.web3, this.contract, this.abi, this.contractAddress, voteName, fromAccount);
    };
    return Dvote;
}());
exports.Dvote = Dvote;
//# sourceMappingURL=dvote.js.map