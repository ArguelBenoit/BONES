

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
  cancel: {
    en: 'CANCEL',
    fr: 'ANNULER'
  },
  download: {
    en: 'DOWNLOAD',
    fr: 'TÉLÉCHARGER'
  },
  import: {
    en: 'IMPORT',
    fr: 'IMPORTER'
  },
  goBack: {
    en: 'GO BACK !',
    fr: 'RETOUR !'
  },
  label: {
    en: 'Label',
    fr: 'Nom'
  },
  encrypt: {
    en: 'Encrypt ctr+j',
    fr: 'Crypter ctr+j'
  },
  decrypt: {
    en: 'Decrypt ctr+k',
    fr: 'Décrypter ctr+k'
  },
  add: {
    en: 'Adding',
    fr: 'Ajout'
  },
  edit: {
    en: 'Edit',
    fr: 'Édition'
  },
  /********************/
  /* actions (modale) */
  /********************/
  actionsFriend: {
    en: 'Do you really want to delete public key ',
    fr: 'Voulez-vous vraiment supprimer la clef publique '
  },
  actionPair: {
    en: 'Do you really want to delete pair ',
    fr: 'Voulez-vous vraiment supprimer la paire '
  },
  actionCreateDB: {
    en: 'BONES has created a dump of your database.',
    fr: 'BONES a créé un dump de la base de données'
  },
  actionImport: {
    en: 'Be careful, importing a dump of bones will overwrite the current data',
    fr: 'Attention, importer un dump de bones va écraser les données actuelles'
  },
  loading: {
    en: 'BONES is working.<br/>Don\'t touch <b>anything</b>!',
    fr: 'BONES travaille.<br/>Ne touchez <b>à rien</b> !'
  },
  successFriend: {
    en: 'Well done, your friend\'s key has been saved.',
    fr: 'Bravo, la clef de votre ami a été enregistrée.'
  },
  successPair: {
    en: 'Well done, your key pair key has been saved.',
    fr: 'Bravo, votre paire de clefs a été enregistrée.'
  },
  successShare: {
    en: 'Your public key is copied to the clipboard. Transmit there in the way of your choice.',
    fr: 'Bravo, votre clef publique est dans votre presse-papiers'
  },
  deleteAllDB: {
    en: 'Do you really want to delete all data?',
    fr: 'Voulez-vous vraiment supprimer toutes les données ?'
  },
  /*************************/
  /* Settings page (index) */
  /*************************/
  /* header */
  headerTxt: {
    en: 'BONES is a utility for RSA (2048) encryption and decryption of your messages on any communication system. Manage your RSA keys yourself. You are the only master.',
    fr: 'BONES est un utilitaire pour le cryptage RSA (2048) et le décryptage de vos messages sur n\'importe quelle plateforme de communication. Gérez vous-même vos clefs RSA. Vous êtes le seul maître.'
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
  emptyPair: {
    en: 'BONES does not have your keys. To encrypt and decrypt your messages BONES needs a pair of RSA 2048 keys.',
    fr: 'BONES ne possède pas de clef. Pour chiffrer et déchiffrer vos messages, BONES a besoin d\'une paire de clefs RSA 2048.'
  },
  /* friends section */
  friendTitle: {
    en: 'Friends (their public keys)',
    fr: 'Amis (leurs clefs publiques)'
  },
  friendAddButton: {
    en: 'Add a friend\'s key',
    fr: 'Ajouter la clef d\'un ami'
  },
  emptyFriend: {
    en: 'BONES does not have any public key from your friends. To decrypt their encrypted message, it is necessary to have their public key.',
    fr: 'BONES n\'a pas de clefs publiques de vos amis. Pour déchiffrer les messages, il est nécessaire d\'avoir les clefs publiques de vos amis.'
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
  addAnotherFriend: {
    en: 'Add another friend',
    fr: 'Ajouter un autre ami'
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
  /*************************/
  /* Pair form             */
  /*************************/
  pairFormEditTitle: {
    en: ' rsa key pair',
    fr: ' d\'une paire de clefs rsa'
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
    en: 'Save pair',
    fr: 'Enregistrer la paire'
  },
  /*************************/
  /* share form            */
  /*************************/
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
    fr: 'Copier la clef'
  },
  /*************************/
  /* friend form           */
  /*************************/
  friendFormEditTitle: {
    en: ' friend\'s key',
    fr: ' de la clef d\'un ami'
  },
  friendFormPubLabel: {
    en: 'Public key of your friend',
    fr: 'Clef publique de votre ami'
  },
  friendFormPubPlaceholder: {
    en: 'Paste public key here',
    fr: 'Coller la clef publique ici'
  },
  friendFormSave: {
    en: 'Save friend\'s key',
    fr: 'Enregistrer la clef'
  },
  /*------------*/
  /* error form */
  /*------------*/
  fieldRequired: {
    en: 'This field is required',
    fr: 'Ce champ est requis'
  },
  fieldNoPublic: {
    en: 'This is not a RSA public key',
    fr: 'Ce n\'est pas une clef RSA publique'
  },
  fieldNoPrivate: {
    en: 'This is not a RSA private key',
    fr: 'Ce n\'est pas une clef RSA privée'
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
    en: 'Message copied to your clipboard !',
    fr: 'Message copié dans votre presse-papiers !'
  },
  toolboxEncryptSuccess: {
    en: 'Your message is crypted',
    fr: 'Votre message est crypté'
  },
  toolboxLoading: {
    en: 'BONES is working',
    fr: 'BONES travaille'
  },
  /****************************************/
  /* Encrypted Message                    */
  /****************************************/
  encryptedNoKeyMatch: {
    en: '⚠️ No keys matches ⚠️',
    fr: '⚠️ No keys matches ⚠️'
  },
  decryptedHeader: {
    en: '💀 Bones decrypted message 💀\n',
    fr: '💀 Message Bones décrypté 💀\n'
  }
};



export default key => {
  const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
  const locale = userLang === 'fr' ? 'fr' : 'en';
  return dictionary[key][locale];
};
