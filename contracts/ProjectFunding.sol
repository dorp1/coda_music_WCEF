

contract Investment {

	//array of 16 addresses, 20 bytes
	address[16] public projects;
	address client;
	bool _switch;

	event UpdateStatus(string _msg, uint _amount);

	function Investment() {
		client = msg.sender;
	}

	function depositFunds() payable {
		UpdateStatus('User transferred some money', msg.value);
	}

	function withdrawFunds(uint amount) {
		if (client.send(amount)) {
			_switch = true;
		}
		else {
			_switch = false;
		}
	}

	function getFunds() constant returns (uint) {
		return this.balance;
	}

	function invest(uint projectId, uint amount) public returns (uint) {

		require( projectId >= 0 && projectId <= 15 );

		projects[projectId] = msg.sender;

		return projectId;
	}

	function getProjects() public returns (address[16]) {
		return projects;
	}
}

pragma solidity ^0.4.4;
contract ProjectFunding {

    mapping(bytes32 => uint) public fundsReceived;

    bytes32[] projectsList;

    function ProjectFunding(bytes32[] projects) {
        projectsList = projects;
    }

    function totalFundsFor(bytes32 project) returns (uint) {
        return this.balance;
    }

    function fundProject() payable {
        /* if(validProject(project) == false) throw;
        fundsReceived[project] += 100; */
    }

    function validProject(bytes32 project) returns (bool) {
        for (uint i = 0; i < projectsList.length; i++) {
            if (projectsList[i] == project) {
                return true;
            }
            return false;
        }
    }

}
