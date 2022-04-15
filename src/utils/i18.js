


const dictionary = {

  /*****************/
  /* Global        */
  /*****************/

  yes: {
    en: 'YES',
    fr: 'OUI'
  },
  no: {
    en: 'NO',
    fr: 'NON'
  },
  goBack: {
    en: 'GO BACK !',
    fr: 'RETOUR !'
  },
  label: {
    en: 'Label',
    fr: 'Nom'
  },

  /*************************/
  /* Settings page (index) */
  /*************************/

  /* header */
  headerTxt: {
    en: 'BONES is a utility for RSA (2048) encryption and decryption of your messages on any communication system. Manage your RSA keys yourself. You are the only master.',
    fr: 'BONES est un utilitaire pour le cryptage RSA (2048) et le décryptage de vos messages sur n\'importe quelle plateforme de communication. Gérez vous-même vos clés RSA. Vous êtes le seul maître.'
  },
  headerActivate: {
    en: 'Activate BONES',
    fr: 'Activer BONES'
  },

  /* pairs section */
  pairTitle: {
    en: 'Pairs (your key pairs)',
    fr: 'Paires (vos paires de clefs)'
  },
  pairAddButton: {
    en: 'Add a key pair',
    fr: 'Ajouter une paire'
  },
  pairDelete: {
    en: 'Do you really want to delete public key ',
    fr: 'Voulez-vous vraiment supprimer la clef publique '
  },

  /* pairs form */
  pairFormEditTitle: {
    en: 'Edit a personal rsa key pair',
    fr: 'Modifier une paire de clefs rsa personnelle'
  },
  pairFormAddTitle: {
    en: 'Add a personal rsa key pair',
    fr: 'Ajouter une paire de clés rsa personnelle'
  },
  pairFormWarn: {
    en: 'Take care to import a pair of RSA 2048 keys, BONES does not test the consistency of the two keys as well as their size (2048). If you don\'t know what you are doing, use generation.',
    fr: 'Faites attention lorsque vous importez une paire de clefs RSA 2048, BONES ne teste pas la cohérence des deux clefs ni leur taille (2048). Si vous ne savez pas ce que vous faites, utilisez la génération.'
  },
  pairFormGenerate: {
    en: 'Generate pair of key',
    fr: 'Générer une paire de clefs'
  },
  pairFormPriLabel: {
    en: 'Your private key',
    fr: 'Votre clef privée'
  },
  pairFormPriPlaceholder: {
    en: 'Paste your private key here',
    fr: 'Collez votre clef privée ici'
  },
  pairFormPubLabel: {
    en: 'Your public key',
    fr: 'Votre clef publique'
  },
  pairFormPubPlaceholder: {
    en: 'Paste your public key here',
    fr: 'Collez votre clef publique ici'
  },
  pairFormSave: {
    en: 'Save your pair',
    fr: 'Enregistrer votre paire'
  },

  /* share form */
  shareFormTitle: {
    en: 'Copy a public key to share it',
    fr: 'Copier la clef publique pour la partager'
  },
  shareFormWarn: {
    en: 'Be very careful how you transmit your public key, and it is best to use one pair of keys per interlocutor.',
    fr: 'Faites très attention à la façon dont vous transmettez votre clef publique, et il est préférable d\'utiliser une paire de clefs par interlocuteur.'
  },
  shareFormCopy: {
    en: 'Copy in clipboard',
    fr: 'Copier la clef dans le presse-papier'
  },

  /* friends section */
  friendTitle: {
    en: 'Friends (their public keys)',
    fr: 'Amis (leurs clés publiques)'
  },
  friendAddButton: {
    en: 'Add a friend\'s key',
    fr: 'Ajouter la clef d\'un ami'
  },
  friendDelete: {
    en: 'Do you really want to delete public key ',
    fr: 'Voulez-vous vraiment supprimer la clef publique '
  },

  /* pairs form */
  friendFormEditTitle: {
    en: 'Edit a friend\'s key',
    fr: 'Modifier la clef d\'un ami'
  },
  friendFormAddTitle: {
    en: 'Add a friend\'s key',
    fr: 'Ajouter la clef d\'un ami'
  },
  friendFormPubLabel: {
    en: 'Public key of your friend',
    fr: 'Clef publique de votre ami'
  },
  friendFormPubPlaceholder: {
    en: 'Paste your public key here',
    fr: 'Collez sa clef ici'
  },
  friendFormSave: {
    en: 'Save friend\'s key',
    fr: 'Enregistrer la clef'
  },

  /* keys used section */
  keysUsedTitle: {
    en: 'Keys used',
    fr: 'Clefs utilisées'
  },
  keysUsedPair: {
    en: 'Your pair key *',
    fr: 'Votre paire de clefs *'
  },
  keysUsedfriends: {
    en: 'Friend\'s key *',
    fr: 'Les clefs des amis *'
  },

  /* database Actions */
  dbDump: {
    en: 'Make a dump of your database',
    fr: 'Faire un dump des données'
  },
  dbImport: {
    en: 'Import a dump of database',
    fr: 'Importer un dump de données'
  },
  dbRemove: {
    en: 'Delete database',
    fr: 'Supprimer toutes les données'
  },

  /****************************************/
  /* Content (component injected in page) */
  /****************************************/

  toolboxSafeAreaPlaceholder: {
    en: 'Safe area',
    fr: 'Zone de sécurité'
  },
  toolboxEncrypt: {
    en: 'Encrypt ctr+j',
    fr: 'Crypter ctr+j'
  },
  toolboxDecrypt: {
    en: 'Decrypt ctr+k',
    fr: 'Décrypter ctr+k'
  },
  toolboxInstruction: {
    en: 'Show instructions',
    fr: 'Afficher les instructions'
  },
  toolboxTitle1: {
    en: 'Write your message in the safe area',
    fr: 'Écrivez votre message dans la zone de sécurité'
  },
  toolboxTitle2: {
    en: 'Encrypt and cut it with this button',
    fr: 'Cryptez et copiez le, avec ce bouton'
  },
  toolboxTitle3: {
    en: 'Send your encrypted message',
    fr: 'Envoyez votre message crypté'
  },
  toolboxTitle4: {
    en: 'Decrypt messages on the page',
    fr: 'Décryptez les messages sur la page'
  },
  toolboxTitle5: {
    en: 'Informations',
    fr: 'Informations'
  },
  toolboxInstruction3: {
    en: 'Your encrypted text is in your clipboard, you just have to paste it in the field of the website and send it.',
    fr: 'Votre texte crypté est dans votre presse-papiers, il vous suffit de le coller dans le champ du site Web et de l\'envoyer.'
  },
  toolboxInstruction5: {
    en: 'You can try to encrypt directly in a field of the website but this causes failures on many modern platforms, if you encounter a problem as a result of your try in this way, reload the page and use safe area.',
    fr: 'Vous pouvez essayer de chiffrer directement dans un champ du site Web, mais cela provoque des échecs sur de nombreuses plates-formes modernes, si vous rencontrez un problème à la suite de votre essai de cette manière, rechargez la page et utilisez la zone de sécurité.'
  },
  toolboxDecryptSuccess: {
    en: 'Decryption of page messages is complete',
    fr: 'Le décryptage des messages de la page est terminé'
  },
  toolboxEncryptCopySuccess: {
    en: 'Message copied to your clipboard, paste it into the main chat field',
    fr: 'Le message est copié dans votre presse-papiers, Collez-le dans le champ de discussion principal'
  },
  toolboxEncryptSuccess: {
    en: 'Your message is crypted',
    fr: 'Votre message est crypté'
  },

  /****************************************/
  /* Encrypted Message                    */
  /****************************************/

  encryptedNoKeyMatch: {
    en: '⚠️ No keys matches ⚠️',
    fr: '⚠️ No keys matches ⚠️'
  },
  encryptedHeader: {
    en: '💀 Bones decrypted message 💀\n',
    fr: '💀 Bones decrypted message 💀\n'
  }
};



export default key => {
  const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
  const locale = userLang === 'fr' ? 'fr' : 'en';
  return dictionary[key][locale];
};
