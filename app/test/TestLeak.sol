pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Leak.sol";

contract TestLeak {

  // Load the leak contract here
  Leak leak = Leak(DeployedAddresses.Leak());

  string fake_hash = "0xhelloworld";

  function testSubmitHash() {
    Assert.equal(true, leak.addSubmittal(fake_hash), "add submittal did not return true");
  }

  function testReceiveHash() {
    Assert.equal(fake_hash, leak.submittals(1), "did not receive proper hash");
  }
}