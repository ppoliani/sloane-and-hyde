import getWeb3, {getAccounts} from './eth'
import fetch from './api'
import {setItem} from './storage'

const toHex = s => 
  s.split('')
    .reduce((hex, char) => {
      return `${hex}${char.charCodeAt(0).toString(16)}`
    }, '0x');

export const login = () => {
  const data = toHex(process.env.DATA_TO_SIGN);
  const account = getAccounts()[0];

  getWeb3().personal.sign(data, account, async (err, sig) => {
    await authenticate(sig, account);
  });
}

const authenticate = async (sig, account) => {
  try {
    const {token} = await fetch(`${process.env.API_URL}/auth/login`, 'POST', {sig, account});
    setItem(process.env.ACCESS_TOKEN_KEY, token);
    const result = await fetch(`${process.env.API_URL}/orders`);
    console.log('>>>>>', result)
  }
  catch(err) {
    console.log('Error authenticating the user', err);
  }
}
