import React from 'react';
import ReturnLink from 'Components/return-link.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Utils/bus.js';




const Share = () => {

  const { route: getRoute, changeRoute } = useRouterContext();
  const { get: getPair } = usePairsContext();
  const pair = getPair(getRoute.uuid);

  const copy = () => {
    navigator
      .clipboard
      .writeText(pair.public)
      .then(() => {
        Bus.dispatch('ModalSuccess', 'Your public key is copied to the clipboard. Transmit there in the way of your choice');
        changeRoute({ name: 'Index' });
      });
  };

  return <div className="content">
    <ReturnLink/>
    <h1>Copy a public key to share it</h1>
    <div className="form">
      <div className="u-themecolor-color u-themecolor-container u-padding-s u-margin-top-m">
        <i>
          Be very careful how you transmit your public key, and it is best to use one pair of keys per interlocutor.
        </i>
      </div>

      <section className="u-themecolor-container u-padding-s u-margin-top-m">
        <div style={{overflowWrap: 'anywhere'}}>{pair.public}</div>
        <button className="general-button u-margin-top-s" onClick={copy}>Copy in clipboard</button>
      </section>
    </div>
  </div>;
};

export default Share;
