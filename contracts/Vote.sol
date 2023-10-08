// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.4.0 <0.9.0;

contract Vote {

    mapping(string => string[]) private voteBallot;
    mapping(string => bool) private ballotNames;
    mapping(string => mapping(address=>bool)) private voters;
    mapping(string => mapping(address=>string)) private votersVoted;
    mapping(string => mapping(string => uint)) private voteCount;
   
    address private myaddress;

    struct pollResult {
        string name;
        uint256 votes;
    }


    constructor(){


    }

    function createVote(string memory ballotName, string[] memory candidateOption) public returns(string memory){

        require(bytes(ballotName).length > 0, "you must set a name for your voting.");
        require(candidateOption.length > 0, "Candidate options cannot be empty.");
        require(!ballotNames[ballotName] ,"the Poll already existed!");

        ballotNames[ballotName] = true;
 
        voteBallot[ballotName] = candidateOption;
        

       return "create vote successful!";

    }

    function addVote(string memory ballotName, string memory candidate, address addr) public returns(string memory){

        require(ballotNames[ballotName] ,"the Poll doesn't existed!");
        require(!voters[ballotName][addr], "Address has already voted!");

        voteCount[ballotName][candidate]++;
        
        voters[ballotName][addr] = true;
        votersVoted[ballotName][addr] = candidate;
        
        return "Vote successful casted!";

    }

    
    function changeVote(string memory ballotName, string memory candidate, address addr) public returns (string memory) {
       
        require(ballotNames[ballotName] ,"the Poll doesn't existed!");
        require(voters[ballotName][addr], "Address has not voted!");

        string memory lastCandidate = votersVoted[ballotName][addr];

        require(keccak256(abi.encodePacked(lastCandidate)) != keccak256(abi.encodePacked(candidate)), "The voter has already cast a vote for this option!");
        
        voteCount[ballotName][lastCandidate] = voteCount[ballotName][lastCandidate] - 1;
        votersVoted[ballotName][addr] = candidate;
        voteCount[ballotName][candidate]++;

        return "Vote changing casted!";
    }


    function voteResult(string memory ballotName) public view returns( pollResult[] memory){
        
        require(bytes(ballotName).length > 0, "Vote name cannot be empty");
        require(ballotNames[ballotName], "the Poll doesn't existed!");

        string[] memory candidateOptions = voteBallot[ballotName];
        pollResult[] memory result = new pollResult[](candidateOptions.length);

        for (uint i = 0; i < candidateOptions.length; i++) {
            result[i].name = candidateOptions[i];
            result[i].votes = voteCount[ballotName][candidateOptions[i]];
        }

       return result;

   }

}