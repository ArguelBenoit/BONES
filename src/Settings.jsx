import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import Providers from 'Contexts/providers.jsx';
import { manager } from 'Bin/storage/manager.js';
import { tabSubscriber } from 'Bin/dispatch.js';
import { helpers } from 'Bin/helpers.js';
import SettingsRouterTrigger from 'Components/settings-router-trigger.jsx';

// Les composants absolues
import ModalLoading from 'Components/modal-loading.jsx';
import ModalSuccess from 'Components/modal-success.jsx';
import ModalPrompt from 'Components/modal-prompt.jsx';
import ModalDumpDb from 'Components/modal-dump-db.jsx';
import ModalImportDb from 'Components/modal-import-db.jsx';

// styles
import 'Styles/common.less';
import 'Styles/settings.less';
import 'Styles/modale.less';



const Root = () => {

  // pour recharger la page au ping update
  const [ uuid, setUuid ] = useState(helpers.uuid());
  useEffect(() => {
    tabSubscriber(() => {
      setUuid(helpers.uuid());
    });
  }, []);

  return <Providers key={uuid}>
    <ModalLoading />
    <ModalSuccess />
    <ModalPrompt />
    <ModalDumpDb />
    <ModalImportDb />

    <SettingsRouterTrigger />
  </Providers>;
};



const reactRender = () => {
  render(
    <Root />,
    document.getElementById('root')
  );
};



manager.getHasStorage()
  .then( // il y a un store
    () => reactRender() // On inject react
  )
  .catch(() => { // il y a pas de store
    manager.setInitialStorage().then( // on initialise le store
      () => reactRender() // On inject react
    );
  });
