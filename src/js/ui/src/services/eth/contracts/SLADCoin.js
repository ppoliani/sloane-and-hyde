const Maybe = require('folktale/maybe')
const sladCoinContractDefinition = require('../../../../solidity/SLADCoin/build/contracts/SLADCoin.json');
const {listenToEvents} = require('../events/labCoinEvents')
const getWeb3 = require('../index')

const CONTRACT_ADDR = '0xee92b8f67d21ccfdca5e2b33c6856f9b9a327bdf';
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
 

