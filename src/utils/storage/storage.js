/* La classe storage est utilisé par les différents contexts et
par les actions principales de base (delete, import...) */
import { handlers } from 'Utils/handlers.js';


export class Storage {

  // le type est la clef utilise par les 2 listes (pair, friend...)
  // ex: 'friend': ['3412-12md1-12...', '12ik-12md1-12...', ...]
  constructor(type) {
    this.type = type;
  }

  /* ajoute un element avec en clef son uuid et ajoute cet uuid dans le tableau correspondant au type */
  set(objectSended) {
    return new Promise((resolve, reject) => {

      const uuid = handlers.uuid();
      const { type } = this;
      const getter =  handlers.webExt().storage.local.get({[type]: []});
      const setter =  handlers.webExt().storage.local.set({
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
          handlers.webExt().storage.local.set({[type]: newList})
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
          list = await handlers.webExt().storage.local.get({[this.type]: []});
        }
        handlers.webExt().storage.local.get(listArray ? list : list[this.type])
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
      handlers.webExt().storage.local.get(uuid)
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
        const getList = await handlers.webExt().storage.local.get({[this.type]: []});
        handlers.webExt().storage.local.get(getList[this.type])
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
        const getObject = await handlers.webExt().storage.local.get(key);
        newObject = {...getObject[key], ...newObject};
        handlers.webExt().storage.local.set({ [key]: newObject})
          .then(() => {
            resolve();
          });
      })();
    });
  }

  /* supprime un element cible par son uuid */
  remove(uuid) {
    return new Promise((resolve) => {
      handlers.webExt().storage.local.get(this.type)
        .then(data => {
          let newList = data[this.type];
          let indexOfUuid = newList.indexOf(uuid);
          newList.splice(indexOfUuid, 1);
          let setterNewList = handlers.webExt().storage.local.set({ [this.type]: newList });
          let removeObject = handlers.webExt().storage.local.remove(uuid);
          Promise.all([setterNewList, removeObject]).then(() => {
            resolve();
          });
        });

    });
  }

}
