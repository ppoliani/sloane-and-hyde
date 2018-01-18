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
  mapping(address => WhitelistData) public whitelist;
  address[] public whitelistAddreses;

  struct WhitelistData {
    bool status;
    uint256 index;
  }

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) Ownable() {
    totalSupply = _supply; // * (10 ** uint256(decimals));
    whitelist[msg.sender] = WhitelistData(true, 0);
    balances[msg.sender] = totalSupply;
  }

  modifier isWhitelisted(address addr) {
    assert(whitelist[addr].status);
    _;
  }

  function getWhitelistAddresses() public returns(address[]) {
    return whitelistAddreses;
  }


  function transfer(address _to, uint256 _value) isWhitelisted(_to) public returns (bool) {
    super.transfer(_to, _value);
  }

  //use only one function to add/remove addresses instead of two separated ones.
  function manageWhitelist(address addr, bool status) onlyOwner() returns (bool) { 
    // Insert a new addr to the whitelist
    if(whitelistAddreses[whitelist[addr].index] != addr) {
      whitelist[addr] = WhitelistData(status, whitelistAddreses.push(addr) - 1);
    }

    // update an existing entry
    whitelist[addr].status = status;

    return true;
  }

}
