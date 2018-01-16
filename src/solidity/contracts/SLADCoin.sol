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

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) Ownable() {
    totalSupply = _supply * (10 ** uint256(decimals));
    balances[msg.sender] = totalSupply;
  }
}
