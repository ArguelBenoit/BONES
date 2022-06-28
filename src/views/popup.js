import React from 'react';
import bones from 'Images/bones/head-regular.png';
import line from 'Images/bones/line.png';
import FormKeysUsed from 'Components/form-keys-used.js';
import { useSettingsContext } from 'Contexts/settings.js';
import i18 from 'Bin/i18.js';
import { handlers } from 'Bin/handlers.js';
import Env from 'Env';



const activeTab = () => {
  handlers.webExt().tabs.query({ title: 'BONES !#@$' }).then(tabs => {
    // si un onglet bones est présent
    if (tabs.length > 0) {
      // on active celui-ci
      const { id } = tabs[0];
      handlers.webExt().tabs.update(id, { active: true });
    // sinon l'onglet n'existe pas
    } else {
        // on ouvre un onglet BONES
        const url = Env.bro === 'firefox'
          ? handlers.webExt().extension.getURL('settings.html')
          : 'settings.html';
        handlers.webExt().tabs.create({ url });
    }
  });
};


const Popup = () => {

  const {
    get: settings,
    modify: setSettings
  } = useSettingsContext();

  const handlerSetValue = event => {
    const { keyState } = event.target.dataset;
    const { checked } = event.target;
    setSettings({[keyState]: checked});
  };

  const { activate } = settings();
  return <div id="popup">

    <header>
      <img
        src={bones}
        width="40"
      />
      <h1>BONES</h1>
      <div className="u-flex --right input-activation">
        <div>{i18('headerActivate')}</div>
        <input
          type="checkbox"
          className="cm-toggle u-margin-left-s"
          checked={activate}
          data-key-state="activate"
          onChange={handlerSetValue}
        />
      </div>
    </header>

    <div className="u-margin-top-m">
      <FormKeysUsed />
    </div>

    <div className="u-flex u-margin-top-m">
      <img src={line} width="70" />
    </div>

    <div>
      {/* prevent default pour conserver le focus dans le champ */}
      <button
        onClick={activeTab}
        className="u-margin-top-m general-button u-full-width"
        onMouseDown={e => e.preventDefault()}
      >
        {i18('settingsButton')}
      </button>
      <div className="u-text-center u-font-size-s u-margin-top-s">
        {i18('settingsButtonInfo')}
      </div>
    </div>

  </div>;

};

export default Popup;
