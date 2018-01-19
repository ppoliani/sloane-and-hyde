const SLADCoin = artifacts.require('SLADCoin');

contract('SLADCoin', accounts => {
  it('should put SLADCoin in the first account', () => {
    return SLADCoin.deployed()
    .then(instance => instance.balanceOf.call(accounts[0]))
    .then(balance => {
      assert.equal(balance.valueOf(), 1000000, `1000000 wasn't in the first account`)
    });
  });

  it('should whitelist owner', () => {
    return SLADCoin.deployed().then(instance => {
      instance.whitelist.call(accounts[0]).then(res => {
        assert.equal(res[0], true, 'Owner was not whitelisted')
      })
    });
  });

  it('should update whitelist', () => {
    return SLADCoin.deployed().then(instance => {
      instance.whitelist.call(accounts[1]).then(res => {
        assert.equal(res[0], false, 'Account 1 is correctly NOT whitelisted')
      });

      instance.manageWhitelist(accounts[1], true).then(() => {
        instance.whitelist.call(accounts[1]).then(res => {
          assert.equal(res[0], true, 'Account is correctly whitelisted')
        });
      })
    })
  })

  it('should return all whitelisted addresses', () => {
    return SLADCoin.deployed().then(instance => {
      instance.getWhitelistAddresses.call().then(res => {
        assert.deepEqual(res, [accounts[0], accounts[1]], 'Wrong list of whitelisted addresses');
      });
    });
  });

  it('should not add an addresses to the whitelist addresses if it already exists', async () => {
    return SLADCoin.deployed().then(async instance => {
      const whitelistAddresses = await instance.getWhitelistAddresses.call();
      assert.deepEqual(whitelistAddresses, [accounts[0], accounts[1]], 'Wrong list of whitelisted addresses');

      const res = await instance.manageWhitelist(accounts[1], true);
      const whitelistAddresses2 = await instance.getWhitelistAddresses.call();
      assert.deepEqual(whitelistAddresses2, [accounts[0], accounts[1]], 'Should not add the same address twice');
    });
  });

  it('should send coin correctly to whitelisted address', () => {
    let meta;
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    let account_one_starting_balance;
    let account_two_starting_balance;
    let account_one_ending_balance;
    let account_two_ending_balance;

    const amount = 10;

    return SLADCoin.deployed().then(instance => {
      meta = instance;
      return meta.balanceOf.call(account_one);
    }).then((balance) => {
      account_one_starting_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then((balance) => {
      account_two_starting_balance = balance.toNumber();
      return meta.transfer(account_two, amount, { from: account_one });
    })
    .then(() => meta.balanceOf.call(account_one))
    .then(balance => {
      account_one_ending_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(balance => {
      account_two_ending_balance = balance.toNumber();
      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, `Amount wasn't correctly taken from the sender`);
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, `Amount wasn't correctly sent to the receiver`);
    });
  });
});
