/* eslint-disable react/no-multi-comp */
import React, { createContext, useState, useContext } from 'react';
const RouterContext = createContext();


// modèle de l'objet route, option n'est pas obligatoire
const initialRoute = {
  name: 'SettingsIndex'
};


// Attache RouterContext.Provider à RouterProvider avec la fonction de
// changement d'état (changeRoute)
function RouterProvider(props) {
  const [ route, setRoute ] = useState(initialRoute);

  function changeRoute(route) {
    setRoute(route);
  }

  return <RouterContext.Provider
    value={{
      route,
      changeRoute
    }}
    {...props}
  />;
}


// Cette fonction permet un import de RouterContext et createContext en une fois
function useRouterContext() {
  return useContext(RouterContext);
}


export { RouterProvider, useRouterContext, RouterContext };
