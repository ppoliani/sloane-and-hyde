pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Whitelistable is Ownable {
  struct WhitelistData {
    bool status;
    uint256 index;
  }

  mapping(address => WhitelistData) private whitelist;
  address[] private whitelistAddresses;

  event LogWhitelistUpdated(address addr, bool status);
  event LogAddedToWhitelist(address addr);

  modifier isWhitelisted(address addr) {
    require(whitelist[addr].status);
    _;
  }

  function Whitelistable() public Ownable() {
    whitelist[msg.sender] = WhitelistData(true, whitelistAddresses.push(msg.sender) - 1);
  }

  function getWhitelist(address addr) public view returns (bool, uint256) {
    return (whitelist[addr].status, whitelist[addr].index);
  }

  function getWhitelistAddresses() public view returns(address[]) {
    return whitelistAddresses;
  }

  //use only one function to add/remove addresses instead of two separated ones.
  function manageWhitelist(address addr, bool status) onlyOwner() public returns (bool) { 
    // Insert a new addr to the whitelist
    if (whitelistAddresses[whitelist[addr].index] != addr) {
      whitelist[addr] = WhitelistData(status, whitelistAddresses.push(addr) - 1);
      LogAddedToWhitelist(addr);
    }

    // update an existing entry
    whitelist[addr].status = status;

    LogWhitelistUpdated(addr, status);

    return true;
  }
}
