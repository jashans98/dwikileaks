pragma solidity ^0.4.4;

contract Leak {
  // wikileaks admin address
  address public admin;
  uint last_visited;
  
  struct Submittal {
    bytes32 ipfs_hash;
    uint time_stamp;
  }

  Submittal[] submittals;

  // event to give the user confirmation once file upload succeeds
  event Delivered(address from, address to, uint amount);

  function Leak() {
    // only gets called when the contract is deployed
    // set the admin to to the person who deploys the contract
    // i.e., wikileaks

    admin = msg.sender;
  }

  function fetchHash(uint i) public returns (bytes32) {
    return submittals[i].ipfs_hash;
  }

  function addSubmittal(bytes32 ipfs_hash) public returns (bool) {
    Submittal memory new_submittal = Submittal(ipfs_hash, now);
    submittals.push(new_submittal);

    // return true just for testing
    return true;
  }

  // fetch last min(submittals.length, 20) submittals
  function fetchRecentSubmittals() public returns (bytes32[20], uint[20]) {
    bytes32[20] hashes;
    uint[20] times;

    for (uint i = 0; i < 20; i++) {
      if (i == submittals.length) {
        hashes[i] = 0;
        times[i] = 0;
      }
      Submittal s = submittals[submittals.length - i -1];
      hashes[i] = s.ipfs_hash;
      times[i] = s.time_stamp;
    }

    return (hashes, times);
    
  }


}