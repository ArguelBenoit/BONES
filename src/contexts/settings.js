/* eslint-disable react/no-multi-comp */
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { Storage } from 'Bin/storage/storage.js';
const store = new Storage();
const SettingsContext = createContext();



// modèle de l'objet settings
const initialSettings = {
  loaded: false,
  activate: true,
  open: true,
  pair: '',
  friends: []
};



// Attache SettingsContext.Provider à SettingsProvider avec le state et les fonctions de changement d'état
function SettingsProvider(props) {
  const [ settings, setSettings ] = useState(initialSettings);


  /* initialisation */
  useEffect(() => {
    const updateState = async () => {
      const settingsStore = await store.getOne('settings');
      const newData = {
        ...settings,
        ...settingsStore,
        loaded: true
      };
      setSettings(newData);
    };
    updateState();
  }, []);


  /* fonctions de changement d'état */
  function modify(obj) {
    store.modify('settings', obj).then(() => {
      setSettings({...settings, ...obj });
    });
  }


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
