import getWeb3, {getAccounts} from './eth'
import fetch from './api'

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
  const token = await fetch(`${process.env.API_URL}/auth/login`, 'POST', {sig, account});
  console.log('>>>>>>>', token);
}
