import React from 'react';
import { useRouterContext } from 'Contexts/router.js';

// pages
import SettingsIndex from 'Views/settings-index.js';
import SettingsFormPair from 'Views/settings-form-pair.js';
import SettingsFormFriend from 'Views/settings-form-friend.js';
import SettingsShare from 'Views/settings-share.js';


const routes = {
  SettingsIndex,
  SettingsFormPair,
  SettingsFormFriend,
  SettingsShare
};



const SettingsRouterTrigger = () => {
  const { route } = useRouterContext();
  return React.createElement(routes[route.name]);
};



export default SettingsRouterTrigger;
