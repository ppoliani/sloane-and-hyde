const firebase = require('firebase')
const {promisify} = require('util')
const {getWeb3, getTransactionReceiptMined} = require('../../common/eth')
const {contract: SLADCoinContract, listenToEvents} = require('../../common/eth/contracts/SLADCoin')
const {getDefaultAccount} = require('../../common/eth')

const loadAccountData = async account => {
  try {
    const data = await firebase.database()
      .ref(`/accounts/${account}`)
      .once('value');
    return data.toJSON();
  }
  catch(err) {
    throw err;
  }
}

const createAccount = (name, iban, email) => ({
  name,
  iban,
  email,
  role: 'user'
});

const manageWhitelist = async (account, isWhitelisted, name, iban, email='') => {
  const web3 = getWeb3();
  const from = await getDefaultAccount();
  const manageWhitelist = promisify(SLADCoinContract.manageWhitelist.sendTransaction);
  const getWhitelistAddresses = promisify(SLADCoinContract.getWhitelistAddresses);

  try {
    const result = await manageWhitelist(account, isWhitelisted, {from, gas: 900000});
    listenToEvents((err, event) => {
      console.log('>>>>>>>>', event)
    })
    const addrs = await getWhitelistAddresses();
    await firebase.database()
      .ref(`/accounts/${account}`)
      .set(createAccount(name, iban, email));
  }
  catch(err) {
    throw err;
  }
}

module.exports = {loadAccountData, manageWhitelist}
