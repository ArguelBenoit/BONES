import { useRouterContext } from 'Contexts/router.jsx';

// pages
import SettingsIndex from 'Views/settings-index.jsx';
import SettingsFormPair from 'Views/settings-form-pair.jsx';
import SettingsFormFriend from 'Views/settings-form-friend.jsx';
import SettingsShare from 'Views/settings-share.jsx';


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
