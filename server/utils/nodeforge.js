const forge = require('node-forge');

module.exports = {
  generateRSAKey: function () {
    // create rsa key 1024 bit
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 1024 });
    // base 64 public key
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
    // base 64 private key
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
    return { publicKeyPem, privateKeyPem, ...keypair }
  },
  encrytAES: function (message, key) {
    let cipher = forge.rc2.createEncryptionCipher(key);
    // init vector là null
    cipher.start(null);
    // mã hóa aes với encode utf8
    cipher.update(forge.util.createBuffer(message, "utf8"), "utf8");
    // hoàn tất việc mã hóa
    cipher.finish();
    return cipher.output;
  },
  decryptAES: function (encrypted, key) {
    let cipher = forge.rc2.createDecryptionCipher(key);
    // init vector là null
    cipher.start(null);
    // giải mã aes với encode utf8
    cipher.update(encrypted, "utf8");
    // hoàn tất việc giải mã
    cipher.finish();
    return cipher.output.data;
  },
  decryptRSA: function (message, privateKey) {
    // decrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
    const decrypted = privateKey.decrypt(message);
    return decrypted;
  }

};

