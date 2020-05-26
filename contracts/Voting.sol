pragma solidity >=0.4.17 <0.7.0;


contract Voting {
    struct Voter {
        bool voted;
        address voterAddr;
    }

    struct Proposal {
        uint256 id;
        address[] proposalVotes;
    }

    uint256 totalVotes = 0;
    uint256 votingEndDate;
    address public admin;

    mapping(address => Voter) public voters;
    Proposal[2] public options;

    constructor() public {
        admin = msg.sender;
        // Tiempo que durará la votación.
        votingEndDate = now + 3 minutes;

        address[] memory emptyArray;

        options[0] = Proposal({id: 0, proposalVotes: emptyArray});
        options[1] = Proposal({id: 1, proposalVotes: emptyArray});
    }

    function vote(uint256 _votedProposal) public {
        // Verifica que el periodo de votacion este activo.
        // El require hace correctamente la validación, pero descuenta gas al usuario.
        require(now <= votingEndDate, "El periodo de votación finalizo");
        if (voters[msg.sender].voted) {
            revert("Solo se permite emitir un voto por persona...!!!");
        }

        voters[msg.sender].voted = true;
        voters[msg.sender].voterAddr = msg.sender;

        Proposal storage proposalId = options[_votedProposal];
        proposalId.proposalVotes.push(voters[msg.sender].voterAddr);

        totalVotes++;
    }

    function results() public view returns (uint256, uint256[2] memory) {
        uint256[2] memory countedVotes;
        for (uint256 item = 0; item < options.length; item++) {
            countedVotes[item] = options[item].proposalVotes.length;
        }
        return (totalVotes, countedVotes);
    }
}
