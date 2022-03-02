


/* Déclenche un evenement vers les script content.js chargé dans toutes les pages web observées
 afin de mettre à jour la toolbox lorsqu'un parametre est mis à jour */

export default () => {

  browser.tabs.query({}).then(tabs => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, 'update')
        .then(() => {})
        .catch(() => {});
    });
  });

};
