import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import {getWeb3} from '../'

const CONTRACT_ADDR = '0x30753e4a8aad7f8597332e813735def5dd395028';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
