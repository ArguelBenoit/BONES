import { RouterProvider } from 'Contexts/router.jsx';
import { PairsProvider } from 'Contexts/pairs.jsx';
import { FriendsProvider } from 'Contexts/friends.jsx';
import { SettingsProvider } from 'Contexts/settings.jsx';


// fonction d'attachement de tout les Providers
// TODO: trouver une méthode plus esthetique
const Providers = props => {

  return <RouterProvider>
    <FriendsProvider>
      <SettingsProvider>
        <PairsProvider
          {...props}
        />
      </SettingsProvider>
    </FriendsProvider>
  </RouterProvider>;
};


export default Providers;
