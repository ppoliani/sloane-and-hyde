const {manageWhitelist} = require('../repositories/accounts')

const updateWhitelist = async (ctx) => {
  const {account, isWhitelisted} = ctx.request.body;

  try {
    await manageWhitelist(account, isWhitelisted);
    ctx.status = 204;
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Access Denied');
  }
}
 
module.exports = {updateWhitelist}
