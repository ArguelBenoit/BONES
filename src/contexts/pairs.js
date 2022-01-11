/* eslint-disable react/no-multi-comp */
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { Storage } from 'Utils/storage.js';
const pairStore = new Storage('pair');
const PairsContext = createContext();



// modèle de l'objet pair, option n'est pas obligatoire
const initialPairs = {
  pairs: []
};



// Attache PairsContext.Provider à PairsProvider avec le state et les fonctions de changement d'état
function PairsProvider(props) {
  const [ pairs, setPairs ] = useState(initialPairs);

  /* initialisation */
  const getList = async () => {
    const list = await pairStore.getList();
    setPairs({ pairs: list });
  };
  useEffect(() => {
    getList();
  }, []);

  /* fonctions de changement d'état */
  function add(pair) {
    pairStore.set(pair).then(() => {
      getList();
    });
  }
  /**/
  function edit(uuid, obj) {
    pairStore.modify(uuid, obj).then(() => {
      getList();
    });
  }


  /* getter */
  function get(uuid) {
    for (const pair of pairs.pairs) {
      if (pair.uuid === uuid) {
        return pair;
      }
    }
    return null;
  }

  const update = getList;
  return <PairsContext.Provider
    value={{ pairs, add, edit, update, get }}
    {...props}
  />;
}



// Cette fonction permet un import de PairsContext et createContext en une fois
function usePairsContext() {
  return useContext(PairsContext);
}



export { PairsProvider, usePairsContext, PairsContext };
