const firebase = require('firebase')
const {promisify} = require('util')
const {getWeb3, getTransactionReceiptMined} = require('../../common/eth')
const {contract: SLADCoinContract, listenToEvents,} = require('../../common/eth/contracts/SLADCoin')
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

const manageWhitelist = async (account, isWhitelisted) => {
  const web3 = getWeb3();
  const from = await getDefaultAccount();
  const manageWhitelist = promisify(SLADCoinContract.manageWhitelist.sendTransaction);
  
  try {
    const txHash = await manageWhitelist(account, isWhitelisted, {from, gas: 900000});
    const receipt = await getTransactionReceiptMined(txHash);
    console.log('>>>>>>>', receipt);
  }
  catch(err) {
    throw err;
  }
}

module.exports = {loadAccountData, manageWhitelist}
