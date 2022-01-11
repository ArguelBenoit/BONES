
import React from 'react';
import bones from 'Images/bones/head-regular.png';
import List from 'Components/list.js';
import { useRouterContext } from 'Contexts/router.js';
import { usePairsContext } from 'Contexts/pairs.js';


const Index = () => {

  const { changeRoute } = useRouterContext();
  const { pairs } = usePairsContext();

  return <div>

    {/*header*/}
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

    {/*<pairs*/}
    <section className="pair-section u-margin-top-m">
      <div className="u-padding u-themecolor-container u-text-center u-white-color u-font-size-l">Pairs (your key pairs)</div>
      <List
        type={'pair'}
        list={pairs.pairs}
      />
      {/*
      <div className="pair-list-empty u-themecolor-container u-padding u-themecolor-color u-text-center u-font-size-s" style={{display: 'none'}}>
        <i>BONES does not have your keys. To encrypt and decrypt your messages BONES needs a pair of RSA 2048 keys.</i>
      </div>
      <div className="pair-list" style={{display: 'none'}}/>
      */}
      <div className="u-padding-s u-themecolor-container">
        <button
          onClick={() => changeRoute({ name: 'FormPair' })}
          className="general-button"
        >
          Add a key pair
        </button>
      </div>
    </section>

  </div>;

};

export default Index;
