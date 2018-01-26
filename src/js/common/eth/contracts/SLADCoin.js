const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => listener => {
  SLADCoinContract.LogAddedToWhitelist().watch(listener);
  SLADCoinContract.LogWhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0x7d74d3679fd1aba51e72331f14a800d4acb1e63d';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}
