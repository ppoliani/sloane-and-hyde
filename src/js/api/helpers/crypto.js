const ethUtil = require('ethereumjs-util')
const {generateToken} = require('../auth/jwt')

const checkSig = (sig, account) => {
  const message = ethUtil.toBuffer(process.env.DATA_TO_SIGN);
  const msgHash = ethUtil.hashPersonalMessage(message);

  // Get the address of whoever signed this message
  const signature = ethUtil.toBuffer(sig);
  const {v, r, s} = ethUtil.fromRpcSig(signature);
  const publicKey = ethUtil.ecrecover(msgHash, v, r, s);
  const sender = ethUtil.publicToAddress(publicKey);
  const addr = ethUtil.bufferToHex(sender);

  return addr === account
    ? generateToken({account})
    : null;
}

module.exports = {checkSig}
