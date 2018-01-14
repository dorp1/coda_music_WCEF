var ProjectFunding = artifacts.require("./ProjectFunding.sol");
// var Crowdfunding = artifacts.require("./Crowdfunding.sol");

module.exports = function(deployer) {
	deployer.deploy(ProjectFunding);
	// deployer.deploy(Crowdfunding);
};
