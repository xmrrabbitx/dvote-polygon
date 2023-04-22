const ContractName = artifacts.require("Vote");

module.exports = function(deployer) {
  deployer.deploy(ContractName);
};
