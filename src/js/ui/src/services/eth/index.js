const Web3 = require('web3')
const Maybe = require('folktale/maybe')
const {prop} = require('../fn')

let web3 = Maybe.Nothing();

const get = () => web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const provider = web3 !== undefined 
      ?  web3.currentProvider
      : new Web3.providers.HttpProvider("http://localhost:8545");
      
    const _web3 = new Web3(provider);
    web3 = Maybe.fromNullable(_web3);
    return _web3;
  }
});

module.exports = get;
