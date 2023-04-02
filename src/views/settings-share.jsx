import ReturnLink from 'Components/return-link.jsx';
import { usePairsContext } from 'Contexts/pairs.jsx';
import { useRouterContext } from 'Contexts/router.jsx';
import Bus from 'Bin/bus.js';
import i18 from 'Bin/i18.js';




const SettingsShare = () => {

  const { route: getRoute, changeRoute } = useRouterContext();
  const { get: getPair } = usePairsContext();
  const pair = getPair(getRoute.uuid);

  const copy = () => {
    navigator
      .clipboard
      .writeText(pair.public)
      .then(() => {
        Bus.dispatch('ModalSuccess', i18('successShare'));
        changeRoute({ name: 'SettingsIndex' });
      });
  };

  return <div className="content">
    <ReturnLink/>
    <h1>{i18('shareFormTitle')}</h1>
    <div className="form">
      <div className="u-themecolor-color u-themecolor-container u-padding-s u-margin-top-m">
        <i>{i18('shareFormWarn')}</i>
      </div>
      <section className="u-themecolor-container u-padding-s u-margin-top-m">
        <div style={{overflowWrap: 'anywhere'}}>{pair.public}</div>
        <button className="general-button u-margin-top-s" onClick={copy}>{i18('shareFormCopy')}</button>
      </section>
    </div>
  </div>;
};

export default SettingsShare;
