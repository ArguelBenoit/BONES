import React from 'react';
import ReturnLink from 'Components/return-link.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useRouterContext } from 'Contexts/router.js';


const Share = () => {

  const { route: getRoute } = useRouterContext();
  const { get: getPair } = usePairsContext();
  const pair = getPair(getRoute.uuid);

  return <div>
    <ReturnLink />

    <div className="u-themecolor-color u-themecolor-container u-padding-s">
      <i>
        Be very careful how you transmit your public key, and it is best to use one pair of keys per interlocutor.
      </i>
    </div>

    <section className="u-themecolor-container">
      <div>{pair.public}</div>
      <button className="general-button">Copy in clipboard</button>
    </section>
  </div>;
};

export default Share;
