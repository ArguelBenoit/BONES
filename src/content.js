import React from 'react';
import { render } from 'react-dom';
import ToolBox from 'Components/tool-box.js';
import { Crypting } from 'Utils/crypting.js';
/* storage */
import { Storage } from 'Utils/storage.js';
const methodStore = new Storage('method');
const friendStore = new Storage('friend');
const pairStore = new Storage('pair');


/* Ce script est chargé dans toutes les pages lorsque l'extension est active.
Si l'url est inscrite dans une méthode alors celui-ci injectera le composant
toolBox dans la page en question.*/


(async () => {

  // Observe si l'url correspond à une methode
  const getMethod = await methodStore.keyValue('url', window.location.href);
  const methodActive = getMethod[0];

  if (methodActive) { // si il y a une methode pour l'url active

    /* créer la div de depart du composant react */
    let div = document.createElement('div');
    div.id = 'BONES-CONTAINER';
    document.body.prepend(div);

    let { instruction } = await browser.storage.local.get('instruction');
    if (typeof instruction !== 'boolean') {
      instruction = true;
    }

    const updateMethod = (key, value) => {
      methodStore.modify(methodActive.uuid, { [key]: value });
    };

    const friends = await friendStore.getList();
    const pair = await pairStore.getOne(methodActive.pair);
    const crypting = new Crypting(friends, pair, methodActive);

    // initialisation de la toolbox
    render(
      <ToolBox
        method={methodActive}
        updateMethod={updateMethod}
        instruction={instruction}
        crypting={crypting}
      />,
      document.getElementById('BONES-CONTAINER')
    );
  }

})();
