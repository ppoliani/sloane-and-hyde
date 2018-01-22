const passport = require('koa-passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const {decodeToken} = require('./jwt')
const {HttpError} = require('../core/api')

const initAuth = () => {
  passport.use(new BearerStrategy(
    async (accessToken, done) => {
      try {
        const decodedToken = await decodeToken(accessToken);
        done(null, decodedToken.account); // userId is the id of the user node
      }
      catch(err) {
        console.error(`Error while verifying access token: ${error}`);
        done(HttpError(401, 'Unauthorized'));
      }
    }
  ));
}

module.exports = {initAuth}
