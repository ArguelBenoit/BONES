import React from 'react';
import { useRouterContext } from 'Contexts/router.js';

// pages
import Index from 'Views/index.js';
import FormPair from 'Views/form-pair.js';
import FormFriend from 'Views/form-friend.js';
import FormMethod from 'Views/form-method.js';
import Share from 'Views/share.js';


const routes = {
  Index,
  FormPair,
  FormFriend,
  FormMethod,
  Share
};



const RouterTrigger = () => {
  const { route } = useRouterContext();
  return React.createElement(routes[route.name]);
};



export default RouterTrigger;
