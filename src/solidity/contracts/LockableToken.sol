pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract LockableToken is StandardToken, Ownable {
  using SafeMath for uint256;

  mapping(address => uint256) public lockedAmounts;

  modifier hasEnoughUnlockedBalance(address addr, uint256 _value) {
    require(balances[addr] - lockedAmounts[addr] >= _value);
    _;
  }

  function lockBalance(address addr, uint256 value) onlyOwner() public returns (bool) {
    require(balances[addr] >= value); //add check to don't lock more than the tokens holded 
    lockedAmounts[addr] = lockedAmounts[addr].add(value); 

    return true;
  }

  function unlockBalance(address addr, uint256 value) onlyOwner() public returns (bool) {
    require(lockedAmounts[addr] >= value); //add check to don't unlock more than the whole balance
    lockedAmounts[addr] = lockedAmounts[addr].sub(value); 

    return true;
  }

  function getLockedAmounts(address addr) public view returns (uint256) {
    return lockedAmounts[addr];
  }

  function unlockAndTransfer(address _to, address _from, uint256 _value) onlyOwner() public returns (bool) {
    if (_value >= lockedAmounts[_from]) {
      lockedAmounts[_from] = 0;
    } else {
      lockedAmounts[_from] = lockedAmounts[_from].sub(_value);
    }

    return transfer(_to, _value);
  }
}
