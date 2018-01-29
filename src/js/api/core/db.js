const firebase = require('firebase')
const Maybe = require('folktale/maybe')
const {prop} = require('../../common/fn')

let _db = Maybe.Nothing();

const db = () => _db.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const val = firebase.database();
    _db = Maybe.fromNullable(val);
    return val;
  }
})

const initDB = () => {
  const config = {
    apiKey: "AIzaSyDS8OTYg5yxnGk75fVxF63Zh6CvgTjQBto",
    authDomain: "sladcoin.firebaseapp.com",
    databaseURL: "https://sladcoin.firebaseio.com",
    projectId: "sladcoin",
    storageBucket: "sladcoin.appspot.com",
    messagingSenderId: "116931835446"
  };

  firebase.initializeApp(config);
}

module.exports = {initDB, db}
