pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Investment.sol";

contract TestInvestment {
	investment = investment( DeployedAddresses.investment());

	function testUserCaninvestPet() {
		uint returnedId = investment.invest(8);

		uint expected = 8;

		Assert.equal( returnedId, expected, "investment of pet Id 8 should be recorded");
	}

	function testGetinvesterAddressByPetId() {
		address expected = this;

		address invester = investment.investors(8);

		Assert.equal(invester, expected, "Owner of pet ID 8 should be recorded.");
	}

	function testGetinvestorsAddressbyPetIdInArray() {
		address expected = this;

		address[16] memory investors = investment.getinvestors();

		Assert.equal( investors[8], expected, "owner of pet id 8 should be recorded.");

	}
}
