/* eslint-disable react/no-multi-comp */
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import contextDispatch from 'Utils/context-dispatch.js';
import { Storage } from 'Utils/storage.js';
const methodStore = new Storage('method');
const MethodsContext = createContext();



// modèle de l'objet method
const initialMethods = {
  loaded: false,
  methods: []
};



// Attache MethodsContext.Provider à MethodsProvider avec le state et les fonctions de changement d'état
function MethodsProvider(props) {
  const [ methods, setMethods ] = useState(initialMethods);


  /* initialisation */
  const getList = async () => {
    const list = await methodStore.getList();
    setMethods({
      loaded: true,
      methods: list
    });
  };
  useEffect(() => {
    getList();
  }, []);


  /* fonctions de changement d'état */
  function add(method) {
    methodStore.set(method).then(() => {
      getList();
      contextDispatch('updateMethod');
    });
  }
  /**/
  function modify(uuid, obj) {
    methodStore.modify(uuid, obj).then(() => {
      getList();
      console.log('ici');
      contextDispatch('updateMethod');
    });
  }
  /**/
  function remove(uuid) {
    methodStore.remove(uuid).then(() => {
      getList();
      contextDispatch('updateMethod');
    });
  }
  /**/
  function keyValue(key, value) {
    methodStore.keyValue(key, value).then(val => {
      return val;
    });
  }


  /* getter */
  function get(uuid) {
    for (const method of methods.methods) {
      if (method.uuid === uuid) {
        return method;
      }
    }
    return null;
  }


  return <MethodsContext.Provider
    value={{
      methods,
      add,
      modify,
      remove,
      get,
      keyValue
    }}
    {...props}
  />;
}



// Cette fonction permet un import de MethodsContext et createContext en une fois
function useMethodsContext() {
  return useContext(MethodsContext);
}



export { MethodsProvider, useMethodsContext, MethodsContext };
