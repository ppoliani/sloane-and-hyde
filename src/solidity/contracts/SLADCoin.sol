pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Whitelistable.sol";
import "./LockableToken.sol";

/**
   @title Token, an extension of ERC20 token standard
   Uses OpenZeppelin StandardToken.
 */
contract SLADCoin is LockableToken, DetailedERC20, Whitelistable {
  uint256 public totalSupply;

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) Ownable() Whitelistable() {
    totalSupply = _supply; // * (10 ** uint256(decimals));
    balances[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) hasEnoughUnlockedBalance(msg.sender, _value) isWhitelisted(_to) public returns (bool) {
    return super.transfer(_to, _value);
  }
}
