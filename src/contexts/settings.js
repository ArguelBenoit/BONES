/* eslint-disable react/no-multi-comp */
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { Storage } from 'Utils/storage.js';
const store = new Storage();
const SettingsContext = createContext();
import contentDispatch from 'Utils/content-dispatch.js';



// modèle de l'objet settings
const initialSettings = {
  loaded: false,
  activate: true,
  stupid: false,
  instruction: true,
  // ces clefs/valeurs sont pour le mode stupid
  open: true,
  pair: '',
  friends: []
};



// Attache SettingsContext.Provider à SettingsProvider avec le state et les fonctions de changement d'état
function SettingsProvider(props) {
  const [ settings, setSettings ] = useState(initialSettings);


  /* initialisation */
  useEffect(() => {
    (async () => {
      const settingsStore = await store.getOne('settings');
      const newData = {
        ...settings,
        ...settingsStore,
        loaded: true
      };
      setSettings(newData);
    })();
  }, []);


  /* fonctions de changement d'état */
  function modify(obj) {
    store.modify('settings', obj).then(() => {
      setSettings({...settings, ...obj });
      contentDispatch();
    });
  }

  // function modify(uuid, obj) {
  //   methodStore.modify(uuid, obj).then(() => {
  //     getList();
  //     contentDispatch();
  //   });
  // }


  /* getter */
  function get() {
    return settings;
  }


  return <SettingsContext.Provider
    value={{
      modify,
      get
    }}
    {...props}
  />;
}


// Cette fonction permet un import de SettingsContext et createContext en une fois
function useSettingsContext() {
  return useContext(SettingsContext);
}


export {
  SettingsProvider,
  useSettingsContext,
  SettingsContext
};
