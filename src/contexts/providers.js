import React from 'react';
import { RouterProvider } from 'Contexts/router.js';
import { PairsProvider } from 'Contexts/pairs.js';
import { FriendsProvider } from 'Contexts/friends.js';
import { MethodsProvider } from 'Contexts/methods.js';


const Providers = props => {
  return <RouterProvider>
    <FriendsProvider>
      <MethodsProvider>
        <PairsProvider
          {...props}
        />
      </MethodsProvider>
    </FriendsProvider>
  </RouterProvider>;
};


export default Providers;
