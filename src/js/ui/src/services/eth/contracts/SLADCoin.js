import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import {getWeb3} from '../'

const CONTRACT_ADDR = '0xe5edca4b6f1b6ab18a7b70ffd21fad461c4c5a56';
export default getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);
