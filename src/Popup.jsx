
import { render } from 'react-dom';
import Popup from 'Views/popup.jsx';
import Providers from 'Contexts/providers.jsx';
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
