const firebase = require('firebase')
const {promisify} = require('util')
const {getWeb3, waitForTxConfirmations} = require('../../common/eth')
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
    const result = await manageWhitelist(account, isWhitelisted, {from, gas: 900000});
    await waitForTxConfirmations(result);
    // At this point we know that
    console.log('>>>>>>>', result)
  }
  catch(err) {
    throw err;
  }
}

module.exports = {loadAccountData, manageWhitelist}
