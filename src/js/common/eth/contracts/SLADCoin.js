const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => listener => {
  SLADCoinContract.WhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0x1730d704b34ae1be69feb8b975bb16fd1e1ccb04';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}
