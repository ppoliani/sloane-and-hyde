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
  mapping(address => bool) public whitelist;
  address[] public balanceAddresses;

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) Ownable() {
    totalSupply = _supply; // * (10 ** uint256(decimals));
    whitelist[msg.sender] = true;
    balances[msg.sender] = totalSupply;
    balanceAddresses.push(msg.sender);
  }

  modifier isWhitelisted(address addr) {
    assert(whitelist[addr]);
    _;
  }

  function getBalanceAddresses() public returns(address[]) {
    return balanceAddresses;
  }

  function transfer(address _to, uint256 _value) isWhitelisted(_to) public returns (bool) {
    assert(super.transfer(_to, _value));
    
    if(balanceOf(_to) == 0x0) {
      balanceAddresses.push(_to);
    }
  }

  //use only one function to add/remove addresses instead of two separated ones.
  function manageWhitelist(address addr, bool status) onlyOwner() returns (bool) { 
    whitelist[addr] = status;
    return true;
  }

}
