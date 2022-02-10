import React, { useState } from 'react';
import { RouterProvider } from 'Contexts/router.js';
import { PairsProvider } from 'Contexts/pairs.js';
import { FriendsProvider } from 'Contexts/friends.js';
import { MethodsProvider } from 'Contexts/methods.js';
import Bus from 'Utils/bus.js';



const Providers = props => {

  const [ state, setState ] = useState({ fakeUpdateId: 1 });
  Bus.subscribe('FullUpdate', () => {
    setState({
      fakeUpdateId: state.fakeUpdateId+1
    });
  });


  return <RouterProvider key={state.fakeUpdateId}>
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
