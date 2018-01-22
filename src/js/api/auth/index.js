const passport = require('koa-passport')
const BearerStrategy = require('passport-http-bearer').Strategy

const initAuth = () => {
  passport.use(new BearerStrategy(
    async (accessToken, done) => {
      console.log('>>>>>>>', accessToken);
    }
  ));
}

module.exports = {initAuth}
