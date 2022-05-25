/* eslint-disable react/no-multi-comp */
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { Storage } from 'Bin/storage/storage.js';
const friendStore = new Storage('friend');
const FriendsContext = createContext();



// modèle de l'objet friend
const initialFriends = {
  loaded: false,
  friends: []
};



// Attache FriendsContext.Provider à FriendsProvider avec le state et les fonctions de changement d'état
function FriendsProvider(props) {
  const [ friends, setFriends ] = useState(initialFriends);


  /* initialisation */
  const getList = async () => {
    const list = await friendStore.getList();
    setFriends({
      loaded: true,
      friends: list
    });
  };
  useEffect(() => {
    getList();
  }, []);


  /* fonctions de changement d'état */
  function add(friend) {
    friendStore.set(friend).then(() => {
      getList();
    });
  }
  /**/
  function modify(uuid, obj) {
    friendStore.modify(uuid, obj).then(() => {
      getList();
    });
  }
  /**/
  function remove(uuid) {
    friendStore.remove(uuid).then(() => {
      getList();
    });
  }


  /* getter */
  function get(uuid) {
    for (const friend of friends.friends) {
      if (friend.uuid === uuid) {
        return friend;
      }
    }
    return null;
  }


  return <FriendsContext.Provider
    value={{
      friends,
      add,
      modify,
      remove,
      get
    }}
    {...props}
  />;
}



// Cette fonction permet un import de FriendsContext et createContext en une fois
function useFriendsContext() {
  return useContext(FriendsContext);
}



export { FriendsProvider, useFriendsContext, FriendsContext };
