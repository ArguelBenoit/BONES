const keypair = require('keypair');


module.exports = {

  /* create a pair of key on 2048b */
  generating() {
    let pair = keypair(2048);
    return pair;
  },

  /* simple private key test */
  checkPrivate(key) {
    const deb = key.indexOf('-----BEGIN RSA PRIVATE KEY-----');
    const deb2 = key.indexOf('-----BEGIN PRIVATE KEY-----');
    const end = key.indexOf('-----END RSA PRIVATE KEY-----');
    const end2 = key.indexOf('-----END PRIVATE KEY-----');

    /* if end and deb exist */
    if ((deb >= 0 || deb2 >= 0) && (end >= 0 || end2 >= 0)) {
      return true;
    } else {
      return false;
    }
  },

  /* simple public key test */
  checkPublic(key) {
    const deb = key.indexOf('-----BEGIN PUBLIC KEY-----');
    const deb2 = key.indexOf('-----BEGIN RSA PUBLIC KEY-----');
    const end = key.indexOf('-----END PUBLIC KEY-----');
    const end2 = key.indexOf('-----END RSA PUBLIC KEY-----');

    /* if end and deb exist */
    if ((deb >= 0 || deb2 >= 0) && (end >= 0 || end2 >= 0)) {
      return true;
    } else {
      return false;
    }
  }

};
