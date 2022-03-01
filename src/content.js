
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



// écouteur des messages entre les différents context (Envoyé par bg-dispatch.js)
// Cela permet par exemple de mettre à jour la toolbox lorsque les paramètres sont mis à jour
browser.runtime.onMessage.addListener(() => {
  INIT();
});



// function d'initialisation/réinitialisation de la toolbox
const INIT = async () => {
  // si l'outil bones existe on la supprime pour la réinitialisation (changement d'url par exemple)
  const bonesDIV = document.querySelector('#BONES-CONTAINER');
  if (bonesDIV) {
    bonesDIV.remove();
  }
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
};



// execute INIT au chargement du script content, ctad au moment ou le DOM a fini de charger.
INIT();


/*
Control des changements d'url pour le cas des sites à routage côté client comme ce de react vue etc...
le setInterval n'est pas très beau mais a l'avantage de fonctionner sur toutes les pages web visitées
et surtout n'écrase pas de l'existant */
// (function () {
//   let location = window.location.href;
//   setInterval(() => {
//     if (location !== window.location.href) {
//       location = window.location.href;
//       INIT();
//     }
//   }, 2000);
// })();
