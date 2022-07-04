import React from 'react';
import bones from 'Images/bones/head-regular.png';
import line from 'Images/bones/line.png';
import 'Styles/settings-index.less';
import List from 'Components/list.js';
import FormKeysUsed from 'Components/form-keys-used.js';
import { useRouterContext } from 'Contexts/router.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useFriendsContext } from 'Contexts/friends.js';
import { useSettingsContext } from 'Contexts/settings.js';
import Bus from 'Bin/bus.js';
import { manager } from 'Bin/storage/manager.js';
import i18 from 'Bin/i18.js';


const SettingsIndex = () => {

  const { changeRoute } = useRouterContext();
  const { pairs } = usePairsContext();
  const { friends } = useFriendsContext();
  const {
    get: settings,
    modify: setSettings
  } = useSettingsContext();

  const loaded =
    pairs.loaded &&
    friends.loaded &&
    settings().loaded;

  const handlerSetValue = event => {
    const { keyState } = event.target.dataset;
    const { checked } = event.target;
    setSettings({[keyState]: checked});
  };


  const deleteDb = () => {
    Bus.dispatch('ModalPrompt', {
      message: i18('deleteAllDB'),
      action: () => {
        manager.deleteAll().then(() => {
          location.reload();
        });
      }
    });
  };

  const { activate } = settings();

  if (!loaded) {
    return null;
  }

  return <div className="content">
    <header className="header">
      <img src={bones} width="100" />
      <div className="u-font-size-s">
        {i18('headerTxt')} <a href="https://github.com/ArguelBenoit/BONES">github</a>
      </div>
    </header>

    <div className="u-flex --left input-activation">
      <input
        type="checkbox"
        className="cm-toggle u-margin-right-s"
        checked={activate}
        data-key-state="activate"
        onChange={handlerSetValue}
      />
      <div>{i18('headerActivate')}</div>
    </div>

    <section className="u-margin-top-m">
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">{i18('pairTitle')}</div>
      <List
        type={'pair'}
        list={pairs.pairs}
        emptyMessage={i18('emptyPair')}
      />
      <div className="u-padding-s u-themecolor-container">
        <button
          onClick={() => changeRoute({ name: 'SettingsFormPair' })}
          className="general-button"
        >
          {i18('pairAddButton')}
        </button>
      </div>
    </section>

    <section className="u-margin-top-m">
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">{i18('friendTitle')}</div>
      <List
        type={'friend'}
        list={friends.friends}
        emptyMessage={i18('emptyFriend')}
      />
      <div className="u-padding-s u-themecolor-container">
        <button
          onClick={() => changeRoute({ name: 'SettingsFormFriend' })}
          className="general-button"
        >
          {i18('friendAddButton')}
        </button>
      </div>
    </section>

    <section className="u-margin-top-m">
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">{i18('keysUsedTitle')}</div>
      <div className="u-themecolor-container u-padding">
        <FormKeysUsed />
      </div>
    </section>

    <div className="u-flex u-margin-top-m">
      <img src={line} width="80" />
    </div>
    <button className="linkstyle-button u-margin-top-s" onClick={() => Bus.dispatch('ModalDumpDb', {})}>{i18('dbDump')}</button>
    <button className="linkstyle-button u-margin-top-s" onClick={() => Bus.dispatch('ModalImportDB', {})}>{i18('dbImport')}</button>
    <button className="linkstyle-button u-margin-top-s" onClick={deleteDb}>{i18('dbRemove')}</button>

  </div>;

};

export default SettingsIndex;
