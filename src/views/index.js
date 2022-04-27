
import React from 'react';
import bones from 'Images/bones/head-regular.png';
import bonesFail from 'Images/bones/head-fail.png';
import line from 'Images/bones/line.png';
import 'Styles/index.less';
import List from 'Components/list.js';
import FormKeysUsed from 'Components/form-keys-used.js';
import { useRouterContext } from 'Contexts/router.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useFriendsContext } from 'Contexts/friends.js';
import { useSettingsContext } from 'Contexts/settings.js';
import Bus from 'Utils/bus.js';
import i18 from 'Utils/i18.js';
import { manager } from 'Utils/storage/manager.js';


const Index = () => {

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
      message: 'Do you really want to delete all data?',
      action: () => {
        manager.deleteAll().then(() => {
          location.reload();
        });
      }
    });
  };


  if (loaded) {
    const { activate } = settings();
    return <div className="content">

      <header className="header">
        <img src={activate ? bones : bonesFail} width="100" />
        <div className="u-font-size-s">
          {i18('headerTxt')}
          <a href="https://github.com/ArguelBenoit/e2e-chat-encryption">
            github
          </a>
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
          emptyMessage="BONES does not have your keys. To encrypt and decrypt your messages BONES needs a pair of RSA 2048 keys."
        />
        <div className="u-padding-s u-themecolor-container">
          <button
            onClick={() => changeRoute({ name: 'FormPair' })}
            className="general-button"
          >
            {i18('pairAddButton')}
          </button>
        </div>
      </section>

      <section className="u-margin-top-m">
        <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">Friends (their public keys)</div>
        <List
          type={'friend'}
          list={friends.friends}
          emptyMessage="BONES does not have any public key from your friends. To decrypt their encrypted message, it is necessary to have their public key."
        />
        <div className="u-padding-s u-themecolor-container">
          <button
            onClick={() => changeRoute({ name: 'FormFriend' })}
            className="general-button"
          >
            Add a friend's key
          </button>
        </div>
      </section>

      <section className="u-margin-top-m">
        <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">Keys used</div>
        <FormKeysUsed />
      </section>

      <div className="u-flex u-margin-top-m">
        <img src={line} width="80" />
      </div>
      <button className="linkstyle-button u-margin-top-s" onClick={() => Bus.dispatch('ModalDumpDb', {})}>Make a dump of your database</button>
      <button className="linkstyle-button u-margin-top-s" onClick={() => Bus.dispatch('ModalImportDB', {})}>Import a dump of database</button>
      <button className="linkstyle-button u-margin-top-s" onClick={deleteDb}>Delete database</button>

    </div>;

  } else {
    return '';
  }

};

export default Index;
