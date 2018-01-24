const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => listener => {
  SLADCoinContract.LogAddedToWhitelist().watch(listener);
  SLADCoinContract.LogWhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0x2f74ae73471b3e4b85ee57115aec668c2896e80c';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}
