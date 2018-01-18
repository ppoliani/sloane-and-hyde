import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import getWeb3 from '../'

const CONTRACT_ADDR = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
const contract = getWeb3().eth.contract(sladCoinContractDefinition.abi).at(CONTRACT_ADDR);

// const extendedContract = Object.assign({}, contract, {
//   // Add a new function becuase currently the way to invkove the fallback function is 
//   // by utilizing web3.eth.sendTransaction 
//   sendTransaction: ({from, value}) => { 
//     const web3 = getWeb3();
    
//     return new Promise((resolve, reject) => { 
//       web3.eth.sendTransaction({from, to: CONTRACT_ADDR, value: web3.toWei(value, 'ether')}, (error, result) => {
//         if(error) return reject(error);
//         resolve(result);
//       })
//     });
//   }
// })

export default contract;
 
