
import React from 'react';
import { render } from 'react-dom';
import Popup from 'Views/popup.js';
import Providers from 'Contexts/providers.js';
// styles
import 'Styles/common.less';
import 'Styles/popup.less';


const Root = () => {
  return <Providers>
    <Popup />
  </Providers>;
};


render(
  <Root />,
  document.getElementById('root')
);
