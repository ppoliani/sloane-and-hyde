import Maybe from 'folktale/maybe'
import sladCoinContractDefinition from '../../../../../../solidity/build/contracts/SLADCoin.json'
import getWeb3 from '../'

<<<<<<< HEAD
const CONTRACT_ADDR = '0xf204a4ef082f5c04bb89f7d5e6568b796096735a'; 
=======
const CONTRACT_ADDR = '0x91c1bec5c14aa60863f069bb862aa2fe5c01a1cd';
>>>>>>> 55c66dcf5d84514c1d542085f8aa36453d9b793f
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
 

