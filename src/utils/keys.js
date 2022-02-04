const keypair = require('keypair');


module.exports = {

  /* créer une paire 2048 */
  generating() {
    let pair = keypair(2048);
    return pair;
  },

  /* test simple clef publique */
  checkPrivate(key) {
    const deb = key.indexOf('-----BEGIN RSA PRIVATE KEY-----');
    const deb2 = key.indexOf('-----BEGIN PRIVATE KEY-----');
    const end = key.indexOf('-----END RSA PRIVATE KEY-----');
    const end2 = key.indexOf('-----END PRIVATE KEY-----');

    if ((deb >= 0 || deb2 >= 0) && (end >= 0 || end2 >= 0)) {
      return true;
    } else {
      return false;
    }
  },

  /* test simple clef pri */
  checkPublic(key) {
    const deb = key.indexOf('-----BEGIN PUBLIC KEY-----');
    const deb2 = key.indexOf('-----BEGIN RSA PUBLIC KEY-----');
    const end = key.indexOf('-----END PUBLIC KEY-----');
    const end2 = key.indexOf('-----END RSA PUBLIC KEY-----');

    if ((deb >= 0 || deb2 >= 0) && (end >= 0 || end2 >= 0)) {
      return true;
    } else {
      return false;
    }
  }

};
