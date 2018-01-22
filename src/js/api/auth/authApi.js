const firebase = require('firebase')
const {HttpError} = require('../core/api')
const {checkSig} = require('../helpers/crypto')

const login = async (ctx) => {
  const {sig, account} = ctx.request.body;
  const token = checkSig(sig, account);

  if(token) {
    ctx.body = {token};
  }
  else {
    ctx.body = HttpError(403, 'Access Denied');
  }
}

module.exports = {login}
