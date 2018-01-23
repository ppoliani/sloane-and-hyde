const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../../../solidity/build/contracts/SLADCoin.json')
const {getWeb3} = require('../')

const listenToEvents = SLADCoinContract => {
  const WhitelistUpdatedEvent = SLADCoinContract.WhitelistUpdated();
  
  WhitelistUpdatedEvent.watch((error, result) => {
    if (!error) {
      console.log('Whitelist updated: ', result)
    } else {
      console.log(error);
    }
  });
}

const CONTRACT_ADDR = '0xb41be80ef5222d16d5270531d57b64b495c0a059';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

listenToEvents(contract);

module.exports = contract
