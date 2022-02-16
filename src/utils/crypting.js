const encryptHeader = '~ BONES ENCRYPTED MESSAGE';
const decryptHeader = '💀 BONES DECRYPTED MESSAGE 💀\n';
import crypto from 'crypto';



export class Crypting {

  constructor(friends, pair) {
    this.friends = friends;
    this.pair = pair;
    // tableau de toutes lec clef, celle de la paire et celles des amis
    this.keys = [...friends, pair];
  }

  /* encrypter un message (max 214, pour le moment)*/
  encrypt(message) {

    let value = `${encryptHeader}`;

    for (let key of this.keys) {

      const buffer = Buffer.from(message, 'utf8');
      const encrypted = crypto
        .publicEncrypt(key.public, buffer)
        .toString('base64');

      value += ` ~ EWTK ${key.uuid} ~ ${encrypted}`; // EWTK = Encrypted With This Key (uuid)
    }

    return value;
  }

  /* retourne un objet contenant le message déchiffré et la clef permettant le déchiffrage */
  decrypt(rawText) {

    let txtFormated = rawText
      .trim()
      .substring(encryptHeader.length) // supprime le header
      .split(' ~ EWTK ') // découpe avec ce separateur (8 car)
      .map(e => e.trim())
      .filter(e => e.length > 0) // supprime les chaines vides
      .map(e => {
        // ex, e = 9cfb8d5e-8577-43e2-ad4f-2cb3f82666d9 ~ gjzHvetuOQtPjdZz7ItcMo0yyFWGqdmhhDw28ku2MNrFnDKtDJcfL9HD...
        return {
          uuid: e.substring(0, 36),
          encrypted: e.substring(39, e.length)
        };
      });

    // si l'uuid de la pair est le même c'est que j'en suis l'auteur
    const iAmTheAuthor = txtFormated.find(e => e.uuid === this.pair.uuid);

    // si je suis l'auteur je décrypte avec la clef privé de la paire
    if (iAmTheAuthor) {

      const buffer = Buffer.from(iAmTheAuthor.encrypted, 'base64');
      const decrypted = crypto.privateDecrypt(this.pair.private, buffer);
      return decrypted.toString('utf8');

    // boucle sur tout les textes splité pour essayer de décrypter
    } else {

      for (let element of txtFormated) {
        const buffer = Buffer.from(element.encrypted, 'base64');
        try {
          const decrypted = crypto.privateDecrypt(this.pair.private, buffer);
          return decrypted.toString('utf8');
        } catch {
          console.warn('decrypt not working with this key');
        }
      }

      return '⚠️ No keys matches ⚠️';

    }
  }

  /* maj du dom pour un message */
  updateDOM(node, rawText) {
    const decrypted = this.decrypt(rawText);
    node.parentNode.innerHTML = `${decryptHeader}${decrypted}`;
  }

  /* recherche les message crypté */
  parse() {
    return new Promise(resolve => {
      // fonction recursive
      const checkAllChilds = node => {
        // sur tout les enfants
        for (let i = 0; i < node.childNodes.length; i++) {

          const {
            childNodes: _childNodes,
            textContent: rawText,
            nodeName
          } = node.childNodes[i];

          const excluded = ['SCRIPT', 'HEADER', 'FOOTER', 'NAV'];

          if (excluded.indexOf(nodeName) === -1) { // si pas exclu

            if (_childNodes.length > 0) { // si le noeud a des enfants
              // relance la fonction (recursif)
              checkAllChilds(node.childNodes[i]);

            } else if (rawText.indexOf(encryptHeader) > -1) { // si le texte a le header BONES
              // mise a jour du dom pour un message
              this.updateDOM(node.childNodes[i], rawText);
            }

          }
        }
      };

      checkAllChilds(document.body);

      resolve();

    });
  }

}
