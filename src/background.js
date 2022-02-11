


const activeTab = () => {
  browser.tabs.query({ title: 'BONES !#@$' }).then(tabs => {

    if (tabs.length > 0) { // si un onglet bones est présent
      // on active celui-ci
      const { id } = tabs[0];
      browser.tabs.update(id, { active: true });

    } else { // sinon l'onglet n'existe pas
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
