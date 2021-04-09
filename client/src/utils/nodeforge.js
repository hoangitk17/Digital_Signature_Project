import forge from 'node-forge';

export default {
  generateAESKey: function () {
    // create rsa key with 16 bytes = 128 bits
    const key = forge.random.getBytesSync(16);
    // return bytes of key 
    return key;
  },
  encrytAES: function (message, key) {
    let cipher = forge.rc2.createEncryptionCipher(key);
    // init vector là null
    cipher.start(null);
    // mã hóa aes với encode utf8
    cipher.update(forge.util.createBuffer(message, "utf8"), "utf8");
    // hoàn tất việc mã hóa
    cipher.finish();
    return cipher.output.data;
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
  encryptRSA: function (message, publicKeyPem) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    // encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
    const encrypted = publicKey.encrypt(message);
    return encrypted;
  }
};
