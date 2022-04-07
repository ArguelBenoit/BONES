import webExt from 'Utils/web-ext.js';


const activeTab = () => {
  webExt().tabs.query({ title: 'BONES !#@$' }).then(tabs => {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      const { id } = tabs[0];
      webExt().tabs.update(id, { active: true });
    // sinon l'onglet n'existe pas
    } else {
      // on ouvre un onglet BONES
      const url = webExt().extension.getURL('index.html');
      webExt().tabs.create({ url });
    }
  });
};



// utilisateur clique sur l'icon de l'extension
webExt()
  .browserAction
  .onClicked
  .addListener(activeTab);



// envoi d'un dispatch vers le script content lorsqu'il y a un changement d'url
// obligatoire pour les routages côté client comme avec react et vue
webExt().tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    webExt().tabs.sendMessage(tabId, { action: 'MAINUPDATE' }).then(() => {}).catch(() => {});
  }
});
