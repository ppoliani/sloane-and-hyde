const Web3 = require('web3')
const Maybe = require('folktale/maybe')
const promisify = require('es6-promisify')
const {prop} = require('../fn')

let _web3 = Maybe.Nothing();

const getWeb3 = () => _web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const provider = global.web3 !== undefined 
      ? web3.currentProvider
      : new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER);
      
    const _web3Inst = new Web3(provider);
    _web3 = Maybe.fromNullable(_web3Inst); 
    return _web3Inst;
  }
});

const getAccounts = promisify(getWeb3().eth.getAccounts);

const getDefaultAccount = async () => {
  const accounts = await getAccounts();
  return accounts[0];
}

const waitForTxConfirmations = (txHash, confirmations=2) => {
  const web3 = getWeb3();
  const filter = web3.eth.filter('latest');

  return new Promise((resolve, reject) => {
    const subscription = filter.watch((error, result) => {
      if(!error) {
        const confirmedBlock = web3.eth.getBlock(web3.eth.blockNumber - confirmations);
        const found = confirmedBlock.transactions.find(txId === txHash);

        if(found) {
          subscription.stopWatching();
          return resolve();
        } 
        reject();
      }
    });
  });
}

const getTransactionReceiptMined = txHash => 
  new Promise((resolve, reject) => {
    const transactionReceiptAsync = async (resolve, reject) => {
      const web3 = getWeb3();
      const getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);
      const receipt = await getTransactionReceipt(txHash);
      
      if(receipt === null) {
        setTimeout(() => transactionReceiptAsync(resolve, reject), 500);
      }
      else {
        resolve(receipt);
      }
    }

    transactionReceiptAsync(resolve, reject);
  });


module.exports = {getWeb3, getAccounts, getDefaultAccount, getTransactionReceiptMined}
