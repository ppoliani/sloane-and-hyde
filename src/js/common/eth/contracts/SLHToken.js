const {promisify} = require('util')

const Maybe = require('folktale/maybe')
const SLHTokenDefinition = require('../../../../solidity/build/contracts/SLHToken.json')
const {getWeb3} = require('../') 

const listenToEvents = SLHToken => listener => {
  SLHToken.LogAddedToWhitelist().watch(listener);
  SLHToken.LogWhitelistUpdated().watch(listener);
}
 
const CONTRACT_ADDR = '0x6aef03a20330b4546ef1df19a11f49a1843f5788';
const contract = getWeb3().eth.contract(SLHTokenDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: listenToEvents(contract)
}
