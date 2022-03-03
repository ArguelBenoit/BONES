

import webExt from 'Utils/web-ext.js';
/* Déclenche un evenement vers les script content.js chargé dans toutes les pages web observées
 afin de mettre à jour la toolbox lorsqu'un parametre est mis à jour */


// actions traitées : MAINUPDATE, TOGGLEUPDATE (pour le mode stupid), INSTRUCTIONUPDATE
// data type object ex : { value: true }
export default (action, data = {}) => {

  webExt().tabs.query({}).then(tabs => {
    tabs.forEach(tab => {
      webExt().tabs.sendMessage(tab.id, {...data, action})
        .then(() => {})
        .catch(() => {});
    });
  });

};
