import {createAction} from 'redux-actions'
import promisify from 'es6-promisify'
import {Map} from 'immutable'
import {partial} from '../../../../common/fn'
import {contract as SLADCoinContract} from '../../../../common/eth/contracts/SLADCoin'
import {getAccounts} from '../../../../common/eth'
import {login} from '../../services/crypto' 
import fetch from '../../services/api'

export const getBalanceOf = async account => {
  try {
    const getBalanceOf = promisify(SLADCoinContract.balanceOf);
    return await getBalanceOf(account);
  } catch (err) {
    console.log('Error reading the balance of an account', err);
  }
}

export const transfer = async (to, amount) => {
  try {
    const accounts = getAccounts();
    const transfer = promisify(SLADCoinContract.transfer);
    console.log(`transfering ${amount} to ${to}`)
    return await transfer(to, Number(amount), {
      from: accounts[0]
    });
  } catch (err) {
    console.log('Error while transfering balance', err);
  }
}

export const getAllBalances = async () => {
  try {
    const getBalanceOf = promisify(SLADCoinContract.balanceOf);
    const getWhitelistAddresses = promisify(SLADCoinContract.getWhitelistAddresses);
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

export const addToWhitelist = async(account, isWhitelisted) => {
  try {
    await fetch(`${process.env.API_URL}/accounts/whitelist`, 'POST', {account, isWhitelisted});
  } 
  catch (err) {
    console.log('Error adding an account to the whitelist', err);
  }
}
