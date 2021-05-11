const SLHToken = artifacts.require('SLHTaoken');

contract('SLHToken', accounts => {
  it('should put SLHToken in the first account', async () => {
    const instance = await SLHToken.deployed()
    const balance = await instance.balanceOf.call(accounts[0])
  
    assert.equal(balance.valueOf(), 1000000, `1000000 wasn't in the first account`);
  });

  it('should whitelist owner', async () => {
    const instance = await SLHToken.deployed()
    const res = await instance.getWhitelist.call(accounts[0]);

    assert.equal(res[0], true, 'Owner was not whitelisted');
  });

  it('should update whitelist', async () => {
    const instance = await SLHToken.deployed();
    const res = await instance.getWhitelist.call(accounts[1]);
    assert.equal(res[0], false, 'Account 1 is correctly NOT whitelisted');

    await instance.manageWhitelist(accounts[1], true);
    const res2 = await instance.getWhitelist.call(accounts[1]);

    assert.equal(res2[0], true, 'Account is correctly whitelisted');
  });

  it('should return all whitelisted addresses', async () => {
    const instance = await SLHToken.deployed()
    const res = await instance.getWhitelistAddresses.call();
    assert.deepEqual(res, [accounts[0], accounts[1]], 'Wrong list of whitelisted addresses');
  });

  it('should not add an addresses to the whitelist addresses if it already exists', async () => {SLHToken
    const instance = await SLHToken.deployed();
    const whitelistAddresses = await instance.getWhitelistAddresses.call();
    assert.deepEqual(whitelistAddresses, [accounts[0], accounts[1]], 'Wrong list of whitelisted addresses');

    const res = await instance.manageWhitelist(accounts[1], true);
    const whitelistAddresses2 = await instance.getWhitelistAddresses.call();
    assert.deepEqual(whitelistAddresses2, [accounts[0], accounts[1]], 'Should not add the same address twice');
  });

  it('should send coin correctly to whitelisted address', async () => {
    // Get initial balances of first and second account.
    let balance;
    const account_one = accounts[0];
    const account_two = accounts[1];
    const amount = 10;

    const instance = await SLHToken.deployed();
    balance = await instance.balanceOf.call(account_one);
    const account_one_starting_balance = balance.toNumber();
    balance = await instance.balanceOf.call(account_two);
    const account_two_starting_balance = balance.toNumber();
    await instance.transfer(account_two, amount, { from: account_one });
    balance = await instance.balanceOf.call(account_one);
    const account_one_ending_balance = balance.toNumber();
    balance = await instance.balanceOf.call(account_two);
    const account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, `Amount wasn't correctly taken from the sender`);
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, `Amount wasn't correctly sent to the receiver`);
  });
});
