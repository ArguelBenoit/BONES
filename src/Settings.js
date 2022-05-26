import React from 'react';
import { render } from 'react-dom';
import Providers from 'Contexts/providers.js';
import { manager } from 'Bin/storage/manager.js';
import RouterTrigger from 'Components/router-trigger.js';

// Les composants absolues
import ModalLoading from 'Components/modal-loading.js';
import ModalSuccess from 'Components/modal-success.js';
import ModalPrompt from 'Components/modal-prompt.js';
import ModalDumpDb from 'Components/modal-dump-db.js';
import ModalImportDb from 'Components/modal-import-db.js';

// styles
import 'Styles/common.less';
import 'Styles/Settings.less';
import 'Styles/modale.less';



const Root = () => {
  return <Providers>
    <ModalLoading />
    <ModalSuccess />
    <ModalPrompt />
    <ModalDumpDb />
    <ModalImportDb />

    <RouterTrigger />
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
