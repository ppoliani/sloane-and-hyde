import Web3 from 'web3'
import Maybe from 'folktale/maybe'
import {prop} from '../helpers/fn'

let _web3 = Maybe.Nothing();

const getWeb3 = () => _web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const provider = web3 !== undefined 
      ?  web3.currentProvider
      : new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER);
      
    const _web3Inst = new Web3(provider);
    _web3 = Maybe.fromNullable(_web3Inst);
    return _web3Inst;
  }
});

export default getWeb3;
