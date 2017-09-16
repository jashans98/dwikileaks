var Leak = artifacts.require("./Leak.sol");

module.exports = function(deployer) {
  deployer.deploy(Leak);
};
