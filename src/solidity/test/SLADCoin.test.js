var SLADCoin = artifacts.require("SLADCoin");

contract('SLADCoin', function (accounts) {

            it("should put SLADCoin in the first account", function () {
                return SLADCoin.deployed().then(function (instance) {
                    return instance.balanceOf.call(accounts[0]);
                }).then(function (balance) {
                    assert.equal(balance.valueOf(), 1000000, "1000000 wasn't in the first account");
                });
            });


    it("should whitelist owner", function () {
        return SLADCoin.deployed().then(function (instance) {
            meta = instance;
            meta.whitelist.call(accounts[0]).then(res => {
                assert.equal(res, true, "Owner was not whitelisted")
            })
        });
    });
            
            it("should update whitelist", function() {
                return SLADCoin.deployed().then(instance => {
                    meta = instance;
                    meta.whitelist.call(accounts[1]).then(res => {
                        assert.equal(res, false, "Account 1 is correctly NOT whitelisted")
                    })
                    
                    meta.manageWhitelist(accounts[1], true).then(function() {
                        meta.whitelist.call(accounts[1]).then(res => {
                            assert.equal(res, true, "Account is correctly whitelisted")
                        })
                    })

                })
            })

                it("should send coin correctly to whitelisted address", function () {
                    var meta;

                    // Get initial balances of first and second account.
                    var account_one = accounts[0];
                    var account_two = accounts[1];

                    var account_one_starting_balance;
                    var account_two_starting_balance;
                    var account_one_ending_balance;
                    var account_two_ending_balance;

                    var amount = 10;

                    return SLADCoin.deployed().then(function (instance) {
                        meta = instance;
                        return meta.balanceOf.call(account_one);
                    }).then(function (balance) {
                        account_one_starting_balance = balance.toNumber();
                        return meta.balanceOf.call(account_two);
                    }).then(function (balance) {
                        account_two_starting_balance = balance.toNumber();
                        return meta.transfer(account_two, amount, { from: account_one });
                    }).then(function () {
                        return meta.balanceOf.call(account_one);
                    }).then(function (balance) {
                        account_one_ending_balance = balance.toNumber();
                        return meta.balanceOf.call(account_two);
                    }).then(function (balance) {
                        account_two_ending_balance = balance.toNumber();

                        assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
                        assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
                    });
                });
            });