import { helpers } from 'Bin/helpers.js';
import Env from 'Env';


export const activeTab = () => {
  helpers.webExt().tabs.query({ title: 'bones settings !#@$' }).then(tabs => {
    // si un onglet bones est présent on l'active
    if (tabs.length > 0) {
      helpers.webExt().tabs.update(
        tabs[0].id,
        { active: true }
      );
    // sinon on le genere
    } else {
        const url = Env.bro === 'firefox'
          ? helpers.webExt().extension.getURL('settings.html')
          : 'settings.html';
        helpers.webExt().tabs.create({ url });
    }
  });
};
