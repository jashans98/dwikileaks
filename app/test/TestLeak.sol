pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Leak.sol";

contract TestLeak {

  // Load the leak contract here
  Leak leak = Leak(DeployedAddresses.Leak());

  bytes32 fake_hash = "12345678910112";

  function testSubmitHash() {
    Assert.equal(true, leak.addSubmittal(fake_hash), "add submittal did not return true");
  }

  function testReceiveHash() {
    bytes32 received_hash = leak.fetchHash(0);
    Assert.equal(fake_hash, received_hash, "hashes do not match");
  }

  function testReceiveSubmittal() {
    bytes32[20] memory hashes;
    hashes = leak.fetchRecentSubmittals();
    Assert.equal(hashes[0], fake_hash, "hashes should match");
  }
}