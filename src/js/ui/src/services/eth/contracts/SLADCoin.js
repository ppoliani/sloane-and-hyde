import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import {getWeb3} from '../'

const CONTRACT_ADDR = '0x72550990246dbecb705574c7c6dc6d2a1d6fdaec';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
