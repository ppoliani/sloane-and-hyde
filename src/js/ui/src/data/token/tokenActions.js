import {createAction} from 'redux-actions'
import promisify from 'es6-promisify'
import {Map} from 'immutable'
import {partial} from '../../../../common/fn'
import {contract as SLHToken} from '../../../../common/eth/contracts/SLHToken'
import {getDefaultAccount} from '../../../../common/eth'
import {login} from '../../services/crypto' 
import fetch from '../../services/api'

export const getBalanceOf = async account => {
  try {
    const getBalanceOf = promisify(SLHToken.balanceOf);
    return await getBalanceOf(account);
  } catch (err) {
    console.log('Error reading the balance of an account', err);
  }
}

export const transfer = async (to, amount) => {
  try {
    const from = await getDefaultAccount();
    const transfer = promisify(SLHToken.transfer);
    console.log(`transfering ${amount} to ${to}`)
    return await transfer(to, Number(amount), {from});
  } catch (err) {
    console.log('Error while transfering balance', err);
  }
}

export const getAllBalances = async () => { 
  try {
    const getBalanceOf = promisify(SLHToken.balanceOf);
    const getWhitelistAddresses = promisify(SLHToken.getWhitelistAddresses);
    const whitelistAddresses = await getWhitelistAddresses();

    return await whitelistAddresses.reduce(async (accP, addr) => {
      const acc = await accP;
      const balance = await getBalanceOf(addr);

      return { ...acc, [addr]: balance.toNumber()};
    }, Promise.resolve({}))
  } catch (err) {
    console.log('Error getting all balances', err);
  }
}

export const addToWhitelist = async(account, isWhitelisted, name, iban, email) => {
  try {
    await fetch(`${process.env.API_URL}/accounts/whitelist`, 'POST', {account, isWhitelisted, name, iban, email});
  } 
  catch (err) {
    console.log('Error adding an account to the whitelist', err);
  }
}
