const SLADCoin = artifacts.require('./SLADCoin.sol');

module.exports = (deployer) => {
  deployer.deploy(SLADCoin, 1000000, 'SLADCoin', 'SLADCoin', 18); 
};
