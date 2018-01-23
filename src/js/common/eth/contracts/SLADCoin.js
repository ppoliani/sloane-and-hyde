const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => listener => {
  SLADCoinContract.LogAddedToWhitelist().watch(listener);
  SLADCoinContract.LogWhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0x8485f23d4ec3ab61eef04269b6a94adcf51ade11';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}
