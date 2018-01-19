pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "zeppelin-solidity/contracts/token/DetailedERC20.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

/**
   @title Token, an extension of ERC20 token standard
   Uses OpenZeppelin StandardToken.
 */
contract SLADCoin is StandardToken, DetailedERC20, Ownable {
  uint256 public totalSupply;
  mapping(address => WhitelistData) private whitelist;
  address[] private whitelistAddresses;

  struct WhitelistData {
    bool status;
    uint256 index;
  }

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) Ownable() {
    totalSupply = _supply; // * (10 ** uint256(decimals));
    whitelist[msg.sender] = WhitelistData(true, whitelistAddresses.push(msg.sender) - 1);
    balances[msg.sender] = totalSupply;
  }

  modifier isWhitelisted(address addr) {
    require(whitelist[addr].status);
    _;
  }

  function getWhitelist(address addr) public view returns (bool, uint256) {
    return (whitelist[addr].status, whitelist[addr].index);
  }

  function getWhitelistAddresses() public view returns(address[]) {
    return whitelistAddresses;
  }

  function transfer(address _to, uint256 _value) isWhitelisted(_to) public returns (bool) {
    return super.transfer(_to, _value);
  }

  //use only one function to add/remove addresses instead of two separated ones.
  function manageWhitelist(address addr, bool status) onlyOwner() public returns (bool) { 
    // Insert a new addr to the whitelist
    if(whitelistAddresses[whitelist[addr].index] != addr) {
      whitelist[addr] = WhitelistData(status, whitelistAddresses.push(addr) - 1);
    }

    // update an existing entry
    whitelist[addr].status = status;

    return true;
  }
}
