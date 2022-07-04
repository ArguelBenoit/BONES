import { handlers } from 'Bin/handlers.js';
import Env from 'Env';


export const activeTab = () => {
  handlers.webExt().tabs.query({ title: 'bones settings !#@$' }).then(tabs => {
    // si un onglet bones est présent on l'active
    if (tabs.length > 0) {
      handlers.webExt().tabs.update(
        tabs[0].id,
        { active: true }
      );
    // sinon on le genere
    } else {
        const url = Env.bro === 'firefox'
          ? handlers.webExt().extension.getURL('settings.html')
          : 'settings.html';
        handlers.webExt().tabs.create({ url });
    }
  });
};
