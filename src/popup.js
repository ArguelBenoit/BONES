import React from 'react';
import { render } from 'react-dom';
import Providers from 'Contexts/providers.js';
import { manager } from 'Utils/storage/manager.js';
import RouterTrigger from 'Components/router-trigger.js';

// Les composants absolues
import ModalLoading from 'Components/modal-loading.js';
import ModalSuccess from 'Components/modal-success.js';
import ModalPrompt from 'Components/modal-prompt.js';
import ModalDumpDb from 'Components/modal-dump-db.js';
import ModalImportDb from 'Components/modal-import-db.js';

// styles
import 'Styles/common.less';
import 'Styles/button.less';



const PopUp = () => {
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
    <PopUp />,
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
