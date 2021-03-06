const NodeRSA = require('node-rsa');


module.exports = {

  /* créer une paire 2048 */
  generating() {
    const key = new NodeRSA({b: 2048});
    return {
      public: key.exportKey('openssh-public-pem'),
      private: key.exportKey('openssh-private-pem')
    };
  },

  /* test simple clef pub */
  checkPrivate(key) {
    const deb = key.indexOf('-----BEGIN OPENSSH PRIVATE ');
    const end = key.indexOf('-----END OPENSSH PRIVATE KEY-----');
    if (deb >= 0 && end >= 0) {
      return true;
    } else {
      return false;
    }
  },

  /* test simple clef pri */
  checkPublic(key) {
    if (key.indexOf('ssh-rsa ') >= 0) {
      return true;
    } else {
      return false;
    }
  }
};
