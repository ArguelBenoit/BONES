// storage is used by context file and used by main action (ex: dump, import etc...)
import { tools } from 'Utils/tools.js';


export class Storage {

  constructor(type) {
    // the type is a key used on a list of uuid in array, ex with friend
    // ex: 'friend': ['3412-12md1-12...', '12ik-12md1-12...', ...]
    this.type = type;
  }

  /* set element on json storage with an uuid and add this uuid on a list by type */
  set(objectSended) {
    return new Promise((resolve, reject) => {
      /* objectSended.label is required for sort on getList  */
      const uuid = tools.uuid(); /* stun a uuid */
      const { type } = this;
      // getter of list (by type) (default empty array)
      const getter =  browser.storage.local.get({[type]: []}); // by passing an object you can define default values e.g.: []
      // setter of a new object
      const setter =  browser.storage.local.set({
        // assign objectSended with type and uuid
        [uuid]: {
          uuid,
          type,
          ...objectSended
        }
      });
      // promise getter list by type and setter object
      Promise.all([getter, setter])
        .then(data => {
          // add uuid on list by type
          let newList = data[0][type];
          newList.push(uuid);
          //
          browser.storage.local.set({[type]: newList})
            .then(() => resolve()) // success => resolve promise
            .catch(() => reject()); // error => reject promise
        })
        .catch(() => {
          reject(); // error => reject promise
        });

    });
  }

  /* get a array of element by type (constructor) */
  getList() {
    return new Promise((resolve, reject) => {
      (async () => {
        // get list by type
        const getList = await browser.storage.local.get({[this.type]: []});
        // get all element with list of uuid
        browser.storage.local.get(getList[this.type])
          .then(data => {
            // transform JSON to array with values and sort array with label
            let arrayValues = Object.values(data).sort((a, b) => {
              let la = a.label.toLowerCase(),
                lb = b.label.toLowerCase();

              if (la < lb)
                return -1;
              if (la > lb)
                return 1;
              return 0;
            });
            // resolve and send list sorted
            resolve(arrayValues);
          })
          .catch(err => {
            reject(err);
          });
      })();

    });
  }

  /* get one element with your uuid */
  getOne(uuid) {
    return new Promise((resolve, reject) => {
      // get element with uuid key
      browser.storage.local.get(uuid)
        .then(dataObject => {
          // resolve promise with dataObject sended
          resolve(dataObject[uuid]);
        })
        .catch(err => {
          // err reject
          reject(err);
        });

    });
  }

  /* get by key value */
  keyValue(key, value) {
    return new Promise((resolve, reject) => {
      (async () => {
        // get list by type
        const getList = await browser.storage.local.get({[this.type]: []});
        // get all element with list of uuid
        browser.storage.local.get(getList[this.type])
          .then(data => {
            // transform JSON to array with values
            let arrayValues = Object.values(data).filter(item => {
              if (item[key] === value) {
                return true;
              } else {
                return false;
              }
            });
            // resolve and send list filtered by key value
            resolve(arrayValues);
          })
          .catch(err => {
            reject(err);
          });
      })();

    });
  }

  /* edit a single element without its uuid */
  modify(uuid, newObject) {
    return new Promise((resolve) => {
      (async () => {
        // get oldObject
        const getObject = await browser.storage.local.get(uuid);
        // merge old and new object for missing key/value
        newObject = {...getObject[uuid], ...newObject};
        // set new object to uuid
        browser.storage.local.set({ [uuid]: newObject})
          .then(() => {
            resolve();
          });
      })();
    });
  }

  /* remove one element with your uuid and remove the uuid on a type list */
  remove(uuid) {
    return new Promise((resolve) => {

      // get list by type
      browser.storage.local.get(this.type)
        .then(data => {

          // remove uuid on list
          let newList = data[this.type];
          let indexOfUuid = newList.indexOf(uuid);
          newList.splice(indexOfUuid, 1);

          // set new list without uuid
          let setterNewList = browser.storage.local.set({ [this.type]: newList });
          // remove object
          let removeObject = browser.storage.local.remove(uuid);

          // when this two promises is finish => resolve
          Promise.all([setterNewList, removeObject]).then(() => {
            resolve();
          });
        });

    });
  }

  ////////// these functions ignore the type they act on the entire storage ////////

  /* get object of all storage */
  getAll() {
    return new Promise(resolve => {
      let getter = browser.storage.local.get();
      getter.then(data => {
        resolve(data);
      });
    });
  }

  /* /!\ clean all storage /!\*/
  deleteAll() {
    return new Promise(resolve => {
      let cleaner = browser.storage.local.clear();
      cleaner.then(() => {
        resolve();
      });
    });
  }

  /* /!\ this replaces all the existing by the new /!\*/
  importNewStorage() {
    return new Promise(resolve => {
      let cleaner = browser.storage.local.clear();
      cleaner.then(() => {
        resolve();
      });
    });
  }

}
