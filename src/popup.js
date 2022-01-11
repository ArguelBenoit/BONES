/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render } from 'react-dom';
// Router utilise l'api context
import { RouterProvider, RouterContext } from 'Contexts/router.js';
import { PairsProvider } from 'Contexts/pairs.js';
// pages
import Index from 'Views/index.js';
import FormPair from 'Views/form-pair.js';
import FormFriend from 'Views/form-friend.js';
import FormMethod from 'Views/form-method.js';
import Share from 'Views/share.js';
// Les composants absolues
import Loading from 'Components/loading.js';
import Success from 'Components/success.js';
import Prompt from 'Components/prompt.js';
// styles
import 'Styles/common.less';
import 'Styles/button.less';



const MultipleProvider = props => {
  return <RouterProvider>
    <PairsProvider
      {...props}
    />
  </RouterProvider>;
};



const PopUp = () => {

  return <MultipleProvider>
    <Loading />
    <Success />
    <Prompt />
    {/* Obligation d'utiliser ce format car nous sommes juste en dessous du provider */}
    <RouterContext.Consumer>
      {({ route }) => {
        return <div>
          {/* Mon équivalent de react router à la sauce context */}
          {route.name === 'Index' ? <Index /> : ''}
          {route.name === 'FormPair' ? <FormPair /> : ''}
          {route.name === 'Share' ? <Share /> : ''}
          {route.name === 'FormFriend' ? <FormFriend /> : ''}
          {route.name === 'FormMethod' ? <FormMethod /> : ''}
        </div>;
      }}
    </RouterContext.Consumer>
  </MultipleProvider>;

};


render(
  <PopUp />,
  document.getElementById('root')
);
