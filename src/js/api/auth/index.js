const passport = require('koa-passport')
const firebase = require('firebase')
const BearerStrategy = require('passport-http-bearer').Strategy
const {decodeToken} = require('./jwt')
const {HttpError} = require('../core/api')

const initAuth = () => {
  const config = {
    apiKey: "AIzaSyDS8OTYg5yxnGk75fVxF63Zh6CvgTjQBto",
    authDomain: "sladcoin.firebaseapp.com",
    databaseURL: "https://sladcoin.firebaseio.com",
    projectId: "sladcoin",
    storageBucket: "sladcoin.appspot.com",
    messagingSenderId: "116931835446"
  };

  firebase.initializeApp(config);

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
