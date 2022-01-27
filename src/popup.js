import React from 'react';
import { render } from 'react-dom';
import Providers from 'Contexts/providers.js';

// Les composants absolues
import Loading from 'Components/loading.js';
import Success from 'Components/success.js';
import Prompt from 'Components/prompt.js';

import RouterTrigger from 'Components/router-trigger.js';

// styles
import 'Styles/common.less';
import 'Styles/button.less';



const PopUp = () => {
  return <Providers>
    <Loading />
    <Success />
    <Prompt />
    <RouterTrigger />
  </Providers>;
};



render(
  <PopUp />,
  document.getElementById('root')
);
