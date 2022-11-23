import { helpers } from 'Bin/helpers.js';


// envoie un ping de mise à jour au script backgound
export const dispatchUpdateToBG = () => {
  helpers.webExt().runtime.sendMessage({ message:  'UPDATE', title: document.title });
};


// fonction de subsribe du script background et dispatch du ping de mise à jour vers tout les
// contextes de l'extensions (pages de paramètres, script content dans les différents onglets ouverts.)
export const backgroundHandler = () => {
  helpers.webExt().runtime.onMessage.addListener(({ title }) => {

    helpers.webExt().tabs.query({}).then(tabs => {
      tabs.forEach(tab => {
        if (title === 'bones popup !#@$' || !tab.active) {
          helpers.webExt().tabs.sendMessage(tab.id, { message: 'UPDATE' });
        }
      });
    });

  });
};


// fonction de subscribe des pages paramètres, et des script content dans les onglets ouvert (toolbox)
export const tabSubscriber = callback => {
  helpers.webExt().runtime.onMessage.addListener(callback);
};
