const promisify = require('es6-promisify')
const {partial} = require('../../fn')

const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../') 

const listenToEvents = SLADCoinContract => async listener => {
  const WhitelistUpdatedEvent = SLADCoinContract.WhitelistUpdated();
  const watch = promisify(WhitelistUpdatedEvent.watch);
  const result = await watch();

  listener(result);
}
 
const CONTRACT_ADDR = '0xb41be80ef5222d16d5270531d57b64b495c0a059';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

module.exports = {
  contract, 
  listenToEvents: partial(listenToEvents, contract)
}
