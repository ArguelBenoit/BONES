/* La classe storage est utilisé par les différents contexts et
par les actions principales de base (delete, import...) */
import webExt from 'Utils/web-ext.js';
import { tools } from 'Utils/tools.js';


export class Storage {

  constructor(type) {
    /*
    le type est la clef utilise par les 3 listes (pair, friend, method)
    ex: 'friend': ['3412-12md1-12...', '12ik-12md1-12...', ...]
    */
    this.type = type;
  }

  /* ajoute un element avec en clef son uuid et ajoute cet uuid dans le tableau correspondant au type */
  set(objectSended) {
    return new Promise((resolve, reject) => {

      const uuid = tools.uuid();
      const { type } = this;
      const getter =  webExt().storage.local.get({[type]: []});
      const setter =  webExt().storage.local.set({
        [uuid]: {
          uuid,
          type,
          ...objectSended
        }
      });
      Promise.all([getter, setter])
        .then(data => {
          let newList = data[0][type];
          newList.push(uuid);
          webExt().storage.local.set({[type]: newList})
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => {
          reject();
        });

    });
  }

  /* Recupere la liste d'objet sous forme de tableau*/
  getList(listArray) { // list (array) est optionel, si il n'y a pas ce param getList renvois toute la liste du type
    return new Promise((resolve, reject) => {
      (async () => {
        let list;
        if (listArray) {
          list = listArray;
        } else {
          list = await webExt().storage.local.get({[this.type]: []});
        }
        webExt().storage.local.get(listArray ? list : list[this.type])
          .then(data => {
            let arrayValues = Object.values(data).sort((a, b) => {
              let la = a.label.toLowerCase(),
                lb = b.label.toLowerCase();

              if (la < lb)
                return -1;
              if (la > lb)
                return 1;
              return 0;
            });
            resolve(arrayValues);
          })
          .catch(err => {
            reject(err);
          });
      })();

    });
  }

  /* recupere un element par une clef (uuid) */
  getOne(uuid) {
    return new Promise((resolve, reject) => {
      webExt().storage.local.get(uuid)
        .then(dataObject => {
          resolve(dataObject[uuid]);
        })
        .catch(err => {
          reject(err);
        });

    });
  }

  /* recupere une liste d'elements correspondant par clef valeur */
  keyValue(key, value) {
    return new Promise((resolve, reject) => {
      (async () => {
        const getList = await webExt().storage.local.get({[this.type]: []});
        webExt().storage.local.get(getList[this.type])
          .then(data => {
            let arrayValues = Object.values(data).filter(item => {
              if (item[key] === value) {
                return true;
              } else {
                return false;
              }
            });
            resolve(arrayValues);
          })
          .catch(err => {
            reject(err);
          });
      })();
    });
  }

  /* modifie un seul element cible par sa clef (uuid par ex) */
  modify(key, newObject) {
    return new Promise((resolve) => {
      (async () => {
        const getObject = await webExt().storage.local.get(key);
        newObject = {...getObject[key], ...newObject};
        webExt().storage.local.set({ [key]: newObject})
          .then(() => {
            resolve();
          });
      })();
    });
  }

  /* supprime un element cible par son uuid */
  remove(uuid) {
    return new Promise((resolve) => {
      webExt().storage.local.get(this.type)
        .then(data => {
          let newList = data[this.type];
          let indexOfUuid = newList.indexOf(uuid);
          newList.splice(indexOfUuid, 1);
          let setterNewList = webExt().storage.local.set({ [this.type]: newList });
          let removeObject = webExt().storage.local.remove(uuid);
          Promise.all([setterNewList, removeObject]).then(() => {
            resolve();
          });
        });

    });
  }

  ////////// Ces fonctions ignorent le type elles sont employées pour les actions globales ////////

  /* recupere tout le store */
  getAll() {
    return new Promise(resolve => {
      let getter = webExt().storage.local.get();
      getter.then(data => {
        resolve(data);
      });
    });
  }

  /* /!\ supprime tout le store /!\ */
  deleteAll() {
    return new Promise(resolve => {
      let cleaner = webExt().storage.local.clear();
      cleaner.then(() => {
        resolve();
      });
    });
  }

  /* /!\ remplace tout l'existant /!\ */
  async importNewStorage(json) {

    await this.deleteAll();

    return new Promise(resolve => {

      const lists = ['pair', 'friend', 'method'];

      lists.forEach(type => {
        const list = json[type];

        if (list) {
          webExt().storage.local.set({ [type]: list });
          list.forEach(uuid => {

            const element = json[uuid];
            if (element) {
              webExt().storage.local.set({ [uuid]: element });
            }

            if (typeof json.settings === 'object') {
              webExt().storage.local.set({ settings: json.settings });
            }

          });
        }

      });

      resolve();
    });
  }

}
