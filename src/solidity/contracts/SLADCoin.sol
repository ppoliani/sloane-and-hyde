pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "zeppelin-solidity/contracts/token/DetailedERC20.sol";

/**
   @title Token, an extension of ERC20 token standard
   Uses OpenZeppelin StandardToken.
 */
contract SLADCoin is StandardToken, DetailedERC20 {
  uint256 public totalSupply;
  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  function SLADCoin(uint256 _supply, string _name, string _symbol, uint8 _decimals) public DetailedERC20(_name, _symbol, _decimals) {
    totalSupply = _supply * (10 ** uint256(decimals));
    balanceOf[msg.sender] = totalSupply;
  }

}
