import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import {getWeb3} from '../'

const CONTRACT_ADDR = '0xb41be80ef5222d16d5270531d57b64b495c0a059';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
