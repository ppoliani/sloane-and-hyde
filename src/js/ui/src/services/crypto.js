import {getWeb3, getDefaultAccount} from '../../../common/eth'
import fetch from './api'
import promisify from 'es6-promisify'
import {setItem} from './storage'

const toHex = s => 
  s.split('')
    .reduce((hex, char) => `${hex}${char.charCodeAt(0).toString(16)}`, '0x');

export const login = async () => {
  const data = toHex(process.env.DATA_TO_SIGN);
  const account = await getDefaultAccount();
  const sign = promisify(getWeb3().personal.sign);

  try {
    const sig = await sign(data, account);
    return await authenticate(sig, account);
  }
  catch(err) {
    console.log(`Error authenticating the user: ${err}`);
    throw err;
  }
}

const authenticate = async (sig, account) => {
  try {
    const {token, accountData} = await fetch(`${process.env.API_URL}/auth/login`, 'POST', {sig, account});
    setItem(process.env.ACCESS_TOKEN_KEY, token);
    setItem(process.env.ACCOUNT_DATA_KEY, accountData);
  }
  catch(err) {
    console.log('Error authenticating the user', err);
    throw err;
  }
}
