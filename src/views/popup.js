import React from 'react';
import bones from 'Images/bones/head-regular.png';
import line from 'Images/bones/line.png';
import FormKeysUsed from 'Components/form-keys-used.js';
import { useSettingsContext } from 'Contexts/settings.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useFriendsContext } from 'Contexts/friends.js';
import i18 from 'Bin/i18.js';
import { activeTab } from 'Bin/active-tab.js';


const Popup = () => {

  const {
    get: settings,
    modify: setSettings
  } = useSettingsContext();
  const { activate } = settings();
  const { pairs } = usePairsContext();
  const { friends } = useFriendsContext();
  const loaded =
    pairs.loaded &&
    friends.loaded &&
    settings().loaded;

  const handlerSetValue = event => {
    const { keyState } = event.target.dataset;
    const { checked } = event.target;
    setSettings({[keyState]: checked});
  };


  if (!loaded) {
    return null;
  }

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
