const RSA = require('hybrid-crypto-js').RSA;
const rsa = new RSA();
module.exports = {
  // Generate RSA key pair, default key size is 4096 bit
  generateRSAKey4096: async function () {
    let publicKey = "";
    let privateKey = "";
    await rsa.generateKeyPairAsync().then(keyPair => {
      publicKey = keyPair.publicKey;
      privateKey = keyPair.privateKey;
    });
    return { publicKey, privateKey };
  },
};

// https://www.npmjs.com/package/hybrid-crypto-js#rsa-key-pairs
