const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => listener => {
  SLADCoinContract.LogAddedToWhitelist().watch(listener);
  SLADCoinContract.LogWhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0xae39f898931d9f68434da4be58748c1a316a1267';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}