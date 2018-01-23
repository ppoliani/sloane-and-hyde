import Web3 from 'web3'
import Maybe from 'folktale/maybe'
import promisify from 'es6-promisify'
import {prop} from '../fn'

let _web3 = Maybe.Nothing();

export const getWeb3 = () => _web3.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const provider = web3 !== undefined 
      ? web3.currentProvider
      : new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER);
      
    const _web3Inst = new Web3(provider);
    _web3 = Maybe.fromNullable(_web3Inst);
    return _web3Inst;
  }
});

export const getAccounts = promisify(getWeb3().eth.getAccounts);

export const getDefaultAccount = async () => {
  const accounts = await getAccounts();
  return accounts[0];
}

export default getWeb3;
