import React from 'react';
import { RouterProvider } from 'Contexts/router.js';
import { PairsProvider } from 'Contexts/pairs.js';
import { FriendsProvider } from 'Contexts/friends.js';
import { MethodsProvider } from 'Contexts/methods.js';
import { SettingsProvider } from 'Contexts/settings.js';


// fonction d'attachement de tout les Providers
// TODO: trouver une méthode plus esthetique
const Providers = props => {

  return <RouterProvider>
    <FriendsProvider>
      <MethodsProvider>
        <SettingsProvider>
          <PairsProvider
            {...props}
          />
        </SettingsProvider>
      </MethodsProvider>
    </FriendsProvider>
  </RouterProvider>;
};


export default Providers;
