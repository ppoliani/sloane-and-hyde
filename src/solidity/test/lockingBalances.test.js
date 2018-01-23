const assertRevert = require('./helpers/assertRevert')
const {access} = require('fs');

const SLADCoin = artifacts.require('SLADCoin');

contract('SLADCoin Lockings', accounts => {
  it('should lock requested amount', async () => {
    const instance = await SLADCoin.deployed();
    // add to whitelist
    await instance.manageWhitelist.sendTransaction(accounts[1], true, { from: accounts[0] })
    // refill the account1
    await instance.transfer(accounts[1], 200000, { from: accounts[0] })
    // lock the amount1
    await instance.lockBalance(accounts[1], 100000, { from: accounts[0] })
    // check if amount is locked
    const lockedBalance = await instance.getLockedAmounts(accounts[1])

    assert.equal(lockedBalance.toNumber(), 100000, 'Locked amount incorrect');
  });

});

contract('SLADCoin Lockings', accounts => {
  it('should throw if try to send more than unlocked balance', async () => {
    const instance = await SLADCoin.deployed();
    // instance.getWhitelistAddresses().then(adds => console.log('adds', adds))
    await instance.manageWhitelist(accounts[1], true, { from: accounts[0] })
    // refill the account1
    await instance.transfer(accounts[1], 200000, { from: accounts[0] })
    // lock the amount1
    await instance.lockBalance(accounts[1], 100000, { from: accounts[0] })

    await assertRevert(async () => {
      await instance.transfer(accounts[0], 180000, { from: accounts[1] })
    })
  });
  it('should unlock locked balance', async () => {
    const instance = await SLADCoin.deployed();

    // get current locked balance
    const lockedBalance = await instance.getLockedAmounts.call(accounts[1])

    // unlock a part of it
    await instance.unlockBalance(accounts[1], 1000, { from: accounts[0] })

    // get the new lockedBalance
    const newLockedBalance = await instance.getLockedAmounts.call(accounts[1])

    // assert the new lockedBalance is correct
    assert.equal(lockedBalance.toNumber() - 1000, newLockedBalance.toNumber(), 'balance was not unlocked')
  })

  it('should unlock and transfer', async () => {
    const instance = await SLADCoin.deployed();

    // get current locked balance
    const lockedBalanceTwo = await instance.getLockedAmounts.call(accounts[1])
    const balanceOne = await instance.balanceOf(accounts[0])
    const balanceTwo = await instance.balanceOf(accounts[1])

    // console.log('balanceOne', balanceOne.toNumber().toLocaleString(), 'balanceTwo', balanceTwo.toNumber().toLocaleString(), 'lockedBalanceTwo', lockedBalanceTwo.toNumber().toLocaleString())

    await instance.unlockAndTransfer(accounts[0], accounts[1], 7000, { from: accounts[0] })

    // const newBalanceOne = await instance.balanceOf(accounts[0])
    // const newBalanceTwo = await instance.balanceOf(accounts[1])

    // assert.equal(balanceOne - lockedBalance + 1, newBalanceOne, 'receiver has not received the correct amount')
    // assert.equal(balanceTwo - lockedBalance + 1, newBalanceTwo, 'sender has not sent the correct amount')

  })
});


// CASES TO ADD:
// 1) user has locked amount, but can still send the unlocked amount autonomusly
// 2) user has locekd amount and tries to send automonously more than the unlocked amount
// 3) user is sending to his own account
