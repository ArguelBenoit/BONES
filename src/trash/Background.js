import { handlers } from 'Bin/handlers.js';


const activeTab = () => {
  handlers.webExt().tabs.query({ title: 'BONES !#@$' }).then(tabs => {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      const { id } = tabs[0];
      handlers.webExt().tabs.update(id, { active: true });
    // sinon l'onglet n'existe pas
    } else {
      // on ouvre un onglet BONES
      const url = handlers.webExt().extension.getURL('settings.html');
      handlers.webExt().tabs.create({ url });
    }
  });
};



// utilisateur clique sur l'icon de l'extension
handlers.webExt()
  .browserAction
  .onClicked
  .addListener(activeTab);
