pragma solidity ^0.4.4;

contract Leak {
  // wikileaks admin address
  address public admin;

  struct Submittal {
    string ipfs_hash;
    uint submit_time;
  }

  Submittal[] public submittals;

  function Leak() {
    // only gets called when the contract is deployed
    // set the admin to to the person who deploys the contract
    // i.e., wikileaks

    admin = msg.sender;
  }

  function addSubmittal(string ipfs_hash) public returns (bool) {
    // set its current time created to be now
    Submittal memory new_submittal = Submittal(ipfs_hash, now);

    // push onto our array
    submittals.push(new_submittal);

    // return true just for testing
    return true;
  }


}