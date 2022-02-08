
import React from 'react';
import bones from 'Images/bones/head-regular.png';
import line from 'Images/bones/line.png';
import List from 'Components/list.js';
import { useRouterContext } from 'Contexts/router.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { useFriendsContext } from 'Contexts/friends.js';
import { useMethodsContext } from 'Contexts/methods.js';
import Bus from 'Utils/bus.js';


const Index = () => {

  const { changeRoute } = useRouterContext();
  const { pairs } = usePairsContext();
  const { friends } = useFriendsContext();
  const { methods } = useMethodsContext();

  const methodIsBlocked = pairs.pairs.length === 0 || friends.friends.length === 0;

  const activeDumpDb = () => {
    Bus.dispatch('dumpDB', {});
  };

  return <div>

    <header className="header u-flex">
      <img src={bones} width="70" />
      <div className="u-font-size-s u-margin-left-s">
        <b>BONES</b>&nbsp;
        is a utility for RSA (2048) encryption and decryption of your messages on any communication system. Manage your RSA keys yourself. You are the only master.&nbsp;
        <a href="https://github.com/ArguelBenoit/e2e-chat-encryption">
          github
        </a>
      </div>
    </header>

    <section className="u-margin-top-m">
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">Pairs (your key pairs)</div>
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
          Add a key pair
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
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">Methods (keys per thread)</div>
      <List
        type={'method'}
        list={methods.methods}
        emptyMessage="BONES does not have any methodes. Methods are key bindings attached to a url."
      />
      <div className="u-padding-s u-themecolor-container">
        <div
          className="form-error u-text-center u-font-size-s u-margin-bottom-s"
          style={{display: methodIsBlocked ? 'inherit' : 'none'}}
        >
          You need a pair and a friend to create a method
        </div>
        <button
          onClick={methodIsBlocked
            ? () => {}
            : () => changeRoute({ name: 'FormMethod' })
          }
          className="general-button"
          style={
            methodIsBlocked
            ?
              {
                opacity: 0.5,
                cursor: 'not-allowed'
              }
            :
              {}
          }
        >
          Add a method
        </button>
      </div>
    </section>


    <div className="dangerous-actions-buttons">
      <div className="u-flex u-margin-top-m">
        <img src={line} width="80" />
      </div>
      <button className="linkstyle-button u-margin-top-s" onClick={activeDumpDb}>Make a dump of your database</button>
      <button className="linkstyle-button u-margin-top-s">Import a dump of database</button>
      <button className="linkstyle-button u-margin-top-s">Delete database</button>
    </div>

  </div>;

};

export default Index;
