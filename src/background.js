


const activeTab = () => {
  browser.tabs.query({ title: 'BONES !#@$' }).then(tabs => {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      const { id } = tabs[0];
      browser.tabs.update(id, { active: true });
    // sinon l'onglet n'existe pas
    } else {
      // on ouvre un onglet BONES
      const url = browser.extension.getURL('popup.html');
      browser.tabs.create({ url });
    }
  });
};



// utilisateur clique sur l'icon de l'extension
browser
  .browserAction
  .onClicked
  .addListener(activeTab);



// envoi d'un dispatch vers le script content lorsqu'il y a un changement d'url
// obligatoire pour les routages côté client comme avec react et vue
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    browser.tabs.sendMessage(tabId, { action: 'MAINUPDATE' }).then(() => {}).catch(() => {});
  }
});
