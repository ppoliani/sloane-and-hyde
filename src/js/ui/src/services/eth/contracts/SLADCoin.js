import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import getWeb3 from '../'

const CONTRACT_ADDR = '0xde5491f774f0cb009abcea7326342e105dbb1b2e';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
 

