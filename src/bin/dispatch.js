import { handlers } from 'Bin/handlers.js';


// envoie un ping de mise à jour au script backgound
export const dispatchUpdateToBG = () => {
  handlers.webExt().runtime.sendMessage({ message:  'UPDATE', title: document.title });
};


// fonction de subsribe du script background et dispatch du ping de mise à jour vers tout les
// contextes de l'extensions (pages de paramètres, script content dans les différents onglets ouverts.)
export const backgroundHandler = () => {
  handlers.webExt().runtime.onMessage.addListener(({ title }) => {

    handlers.webExt().tabs.query({}).then(tabs => {
      tabs.forEach(tab => {
        if (title === 'bones popup !#@$' || !tab.active) {
          handlers.webExt().tabs.sendMessage(tab.id, { message: 'UPDATE' });
        }
      });
    });

  });
};


// fonction de subscribe des pages paramètres, et des script content dans les onglets ouvert (toolbox)
export const tabSubscriber = callback => {
  handlers.webExt().runtime.onMessage.addListener(callback);
};
