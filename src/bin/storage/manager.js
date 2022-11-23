import { helpers } from 'Bin/helpers.js';
import { dispatchUpdateToBG } from 'Bin/dispatch.js';


export const manager = {


  getHasStorage() {
    return new Promise((resolve, reject) => {
      const getterStore = helpers.webExt().storage.local.get();
      getterStore.then(data => {
        const { settings, friend, pair } = data;
        if (settings && friend && pair) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },


  /* Initialise le store minimum */
  setInitialStorage() {
    return new Promise(resolve => {
      const setPair = helpers.webExt().storage.local.set({ pair: [] });
      const setFriend = helpers.webExt().storage.local.set({ friend: [] });
      const setSettings = helpers.webExt().storage.local.set({ settings: {
        activate: true,
        friends: [],
        pair: '',
        open: true,
        x: 60,
        y: 60
      }});
      Promise
        .all([
          setPair,
          setFriend,
          setSettings
        ])
        .then(() => {
          resolve();
        });
    });
  },


  /* recupere tout le store */
  getAll() {
    return new Promise(resolve => {
      let getter = helpers.webExt().storage.local.get();
      getter.then(data => {
        resolve(data);
      });
    });
  },


  /* /!\ supprime tout le store /!\ */
  deleteAll() {
    return new Promise(resolve => {
      let cleaner = helpers.webExt().storage.local.clear();
      cleaner.then(() => {
        resolve();

        // TODO fix communication between settings and content (toolbox)
        dispatchUpdateToBG();
      });
    });
  },


  /* /!\ remplace tout l'existant /!\ */
  async importNewStorage(json) {
    await this.deleteAll();
    return new Promise(resolve => {
      const lists = ['pair', 'friend'];
      lists.forEach(type => {
        const list = json[type];
        if (list) {
          helpers.webExt().storage.local.set({ [type]: list });
          list.forEach(uuid => {
            const element = json[uuid];
            if (element) {
              helpers.webExt().storage.local.set({ [uuid]: element });
            }
            if (typeof json.settings === 'object') {

              // TODO fix communication between settings and content (toolbox)
              helpers.webExt().storage.local.set({ settings: json.settings }).then(() => {
                dispatchUpdateToBG();
              });
            }
          });
        }
      });
      resolve();
    });
  }


};
