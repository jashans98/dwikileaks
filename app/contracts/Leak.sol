pragma solidity ^0.4.4;

contract Leak {
  // wikileaks admin address
  address public admin;
  uint last_visited;
  

  bytes32[] submittals;

  // event to give the user confirmation once file upload succeeds
  event Delivered(address from, address to, uint amount);

  // fail the event if not enough ether is sent
  event Failed(string reason);

  function Leak() {
    // only gets called when the contract is deployed
    // set the admin to to the person who deploys the contract
    // i.e., wikileaks

    admin = msg.sender;
  }

  function fetchHash(uint i) public returns (bytes32) {
    return submittals[i];
  }

  function addSubmittal(bytes32 ipfs_hash, address toaddr) payable returns (bool) {

    require(msg.value >= 50000000000000000);
    require(toaddr.send(msg.value));


    submittals.push(ipfs_hash);

    // return true just for testing
    Delivered(msg.sender, admin, msg.value);
    return true;
  }

  // fetch last min(submittals.length, 20) submittals
  function fetchRecentSubmittals() public returns (bytes32[20]) {
    bytes32[20] memory hashes;
    // uint[20] times;

    for (uint i = 0; i < 20; i++) {
      if (i >= submittals.length) {
        hashes[i] = 0;
        // times[i] = 0;
      }
      else {
        hashes[i] = submittals[submittals.length - i -1];
      }
      
      // times[i] = s.time_stamp;
    }

    return hashes;
    
  }


}