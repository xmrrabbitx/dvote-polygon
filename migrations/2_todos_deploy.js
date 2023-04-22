const ContractName = artifacts.require("Todos");

module.exports = function(deployer) {
  deployer.deploy(ContractName);
};
