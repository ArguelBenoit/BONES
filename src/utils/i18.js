


const dictionary = {

  /*****************/
  /* Global        */
  /*****************/

  yes: {
    en: 'YES',
    fr: 'YES'
  },
  no: {
    en: 'NO',
    fr: 'NO'
  },
  goBack: {
    en: 'GO BACK !',
    fr: 'GO BACK !'
  },
  label: {
    en: 'Label',
    fr: 'Label'
  },

  /*************************/
  /* Settings page (index) */
  /*************************/

  /* header */
  headerTxt: {
    en: 'BONES is a utility for RSA (2048) encryption and decryption of your messages on any communication system. Manage your RSA keys yourself. You are the only master.',
    fr: 'BONES is a utility for RSA (2048) encryption and decryption of your messages on any communication system. Manage your RSA keys yourself. You are the only master.'
  },
  headerActivate: {
    en: 'Activer BONES',
    fr: 'Activer BONES'
  },

  /* pairs section */
  pairTitle: {
    en: 'Pairs (your key pairs)',
    fr: 'Pairs (your key pairs)'
  },
  pairAddButton: {
    en: 'Add a key pair',
    fr: 'Add a key pair'
  },
  pairDelete: {
    en: 'Do you really want to delete public key ',
    fr: 'Do you really want to delete public key '
  },

  /* pairs form */
  pairFormEditTitle: {
    en: 'Edit a personal rsa key pair',
    fr: 'Edit a personal rsa key pair'
  },
  pairFormAddTitle: {
    en: 'Add a personal rsa key pair',
    fr: 'Add a personal rsa key pair'
  },
  pairFormWarn: {
    en: 'Take care to import a pair of RSA 2048 keys, BONES does not test the consistency of the two keys as well as their size (2048). If you don\'t know what you are doing, use generation.',
    fr: 'Take care to import a pair of RSA 2048 keys, BONES does not test the consistency of the two keys as well as their size (2048). If you don\'t know what you are doing, use generation.'
  },
  pairFormGenerate: {
    en: 'Generate pair of key',
    fr: 'Generate pair of key'
  },
  pairFormPriLabel: {
    en: 'Your private key',
    fr: 'Your private key'
  },
  pairFormPriPlaceholder: {
    en: 'Paste your private key here',
    fr: 'Paste your private key here'
  },
  pairFormPubLabel: {
    en: 'Your public key',
    fr: 'Your public key'
  },
  pairFormPubPlaceholder: {
    en: 'Paste your public key here',
    fr: 'Paste your public key here'
  },
  pairFormSave: {
    en: 'Save your pair',
    fr: 'Save your pair'
  },

  /* share form */
  shareFormTitle: {
    en: 'Copy a public key to share it',
    fr: 'Copy a public key to share it'
  },
  shareFormWarn: {
    en: 'Be very careful how you transmit your public key, and it is best to use one pair of keys per interlocutor.',
    fr: 'Be very careful how you transmit your public key, and it is best to use one pair of keys per interlocutor.'
  },
  shareFormCopy: {
    en: 'Copy in clipboard',
    fr: 'Copy in clipboard'
  },

  /* friends section */
  friendTitle: {
    en: 'Friends (their public keys)',
    fr: 'Friends (their public keys)'
  },
  friendAddButton: {
    en: 'Add a friend\'s key',
    fr: 'Add a key pair'
  },
  friendDelete: {
    en: 'Do you really want to delete public key ',
    fr: 'Do you really want to delete public key '
  },

  /* pairs form */
  friendFormEditTitle: {
    en: 'Edit a friend\'s key',
    fr: 'Edit a friend\'s key'
  },
  friendFormAddTitle: {
    en: 'Add a friend\'s key',
    fr: 'Add a friend\'s key'
  },
  friendFormPubLabel: {
    en: 'Public key of your friend',
    fr: 'Public key of your friend '
  },
  friendFormPubPlaceholder: {
    en: 'Paste your public key here',
    fr: 'Paste your public key here'
  },
  friendFormSave: {
    en: 'Save friend\'s key',
    fr: 'Save friend\'s key'
  },

  /* keys used section */
  keysUsedTitle: {
    en: 'Keys used',
    fr: 'Keys used'
  },
  keysUsedPair: {
    en: 'Your pair key *',
    fr: 'Your pair key *'
  },
  keysUsedfriends: {
    en: 'Friend\'s key *',
    fr: 'Friend\'s key *'
  },

  /* database Actions */
  dbDump: {
    en: 'Make a dump of your database',
    fr: 'Make a dump of your database'
  },
  dbImport: {
    en: 'Import a dump of database',
    fr: 'Import a dump of database'
  },
  dbRemove: {
    en: 'Delete database',
    fr: 'Delete database'
  },

  /****************************************/
  /* Content (component injected in page) */
  /****************************************/

  toolboxSafeAreaPlaceholder: {
    en: 'Safe area',
    fr: 'Safe area'
  },
  toolboxEncrypt: {
    en: 'Encrypt ctr+j',
    fr: 'Encrypt ctr+j'
  },
  toolboxDecrypt: {
    en: 'Decrypt ctr+k',
    fr: 'Decrypt ctr+k'
  },
  toolboxInstruction: {
    en: 'Show instructions',
    fr: 'Show instructions'
  },
  toolboxTitle1: {
    en: 'Write your message in the safe area',
    fr: 'Write your message in the safe area'
  },
  toolboxTitle2: {
    en: 'Encrypt and cut it with this button',
    fr: 'Encrypt and cut it with this button'
  },
  toolboxTitle3: {
    en: 'Send your encrypted message',
    fr: 'Send your encrypted message'
  },
  toolboxTitle4: {
    en: 'Decrypt messages on the page',
    fr: 'Decrypt messages on the page'
  },
  toolboxTitle5: {
    en: 'Information',
    fr: 'Information'
  },
  toolboxInstruction3: {
    en: 'Your encrypted text is in your clipboard, you just have to paste it in the field of the website and send it.',
    fr: 'Your encrypted text is in your clipboard, you just have to paste it in the field of the website and send it.'
  },
  toolboxInstruction5: {
    en: 'You can try to encrypt directly in a field of the website but this causes failures on many modern platforms, if you encounter a problem as a result of your try in this way, reload the page and use safe area.',
    fr: 'You can try to encrypt directly in a field of the website but this causes failures on many modern platforms, if you encounter a problem as a result of your try in this way, reload the page and use safe area.'
  },
  toolboxDecryptSuccess: {
    en: 'Decryption of page messages<br/>is complete',
    fr: 'Decryption of page messages<br/>is complete'
  },
  toolboxEncryptCopySuccess: {
    en: 'Message copied to your clipboard,<br/>Paste it into the main chat field',
    fr: 'Message copied to your clipboard,<br/>Paste it into the main chat field'
  },
  toolboxEncryptSuccess: {
    en: 'Your message is crypted',
    fr: 'Your message is crypted'
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
  const locale = 'fr';
  let loc = locale === 'fr' ? 'fr' : 'en';
  return dictionary[key][loc];
};
