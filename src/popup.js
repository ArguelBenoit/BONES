import React from 'react';
import { render } from 'react-dom';
import Providers from 'Contexts/providers.js';

// Les composants absolues
import ModalLoading from 'Components/modal-loading.js';
import ModalSuccess from 'Components/modal-success.js';
import ModalPrompt from 'Components/modal-prompt.js';
import ModalDumpDb from 'Components/modal-dump-db.js';
import ModalImportDb from 'Components/modal-import-db.js';

import RouterTrigger from 'Components/router-trigger.js';

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



render(
  <PopUp />,
  document.getElementById('root')
);
