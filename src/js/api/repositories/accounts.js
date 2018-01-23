const firebase = require('firebase')

const loadAccountData = async account => {
  try {
    const data = await firebase.database()
      .ref(`/accounts/${account}`)
      .once('value');
    return data.toJSON();
  }
  catch(err) {
    throw err;
  }
}

module.exports = {loadAccountData}
