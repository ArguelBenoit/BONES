// Ce script est chargé dans toutes les pages lorsque l'extension est active.
// Si l'url est inscrite dans une méthode alors celui-ci injectera le composant
// toolBox dans la page en question.
import React from 'react';
import { render } from 'react-dom';
import ToolBox from 'Components/tool-box.js';
import { tools } from 'Utils/tools.js';
const { getActivate, getStupidActive } = tools;
/* storage */
import { Storage } from 'Utils/storage.js';
const store = new Storage();
const methodStore = new Storage('method');



(async () => {

  const settings = await store.getOne('settings');
  const getMethod = await methodStore.keyValue('url', window.location.href);

  /* si l'extension est active, et qu'il y a une méthode pour l'url,
  ou si le mode stupide est actif avec tout ses champs. */
  if (
    getActivate(settings) &&
    (getMethod[0] || getStupidActive(settings))
  ) {

    /* créer la div de depart du composant react */
    let div = document.createElement('div');
    div.id = 'BONES-CONTAINER';
    document.body.prepend(div);

    /* initialisation de la toolbox */
    render(
      <ToolBox />,
      document.getElementById('BONES-CONTAINER')
    );
  }
})();
