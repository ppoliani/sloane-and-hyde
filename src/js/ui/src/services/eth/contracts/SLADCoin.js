import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import getWeb3 from '../'

const CONTRACT_ADDR = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
 

