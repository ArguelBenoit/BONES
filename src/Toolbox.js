//!\\ CONTENT SCRIPT //!\\

// Ce script est chargé dans toutes les pages lorsque l'extension est active.
// Si bones est actif et que les clefs sont inscrites, celui-ci injectera le composant
// toolBox dans la page en question.
import React from 'react';
import { render } from 'react-dom';
import ToolBox from 'Components/tool-box.js';
import { handlers } from 'Bin/handlers.js';
import { subscribeUpdate } from 'Bin/dispatch.js';
const { getActivate } = handlers;
/* storage */
import { Storage } from 'Bin/storage/storage.js';
const store = new Storage();


// écouteur les messages entre les différents context (Envoyé par dispatch.js)
// Cela permet par exemple de mettre à jour la toolbox lorsque les paramètres sont mis à jour
subscribeUpdate(() => {});


// function d'initialisation/réinitialisation de la toolbox
const INIT = async () => {
  const settings = await store.getOne('settings');
  /* si l'outil bones existe on la supprime pour la réinitialisation (changement d'url par exemple) */
  if (document.querySelector('#BONES-CONTAINER')) {
    document.querySelector('#BONES-CONTAINER').remove();
  }
  /* si l'extension est active */
  if (getActivate(settings)) {
    /* créer la div de depart du composant react */
    let div = document.createElement('div');
    div.id = 'BONES-CONTAINER';
    document.body.prepend(div);
    /* initialisation de la toolbox */
    render(
      <ToolBox
        coordinate={{
          x: settings.x,
          y: settings.y
        }}
      />,
      document.getElementById('BONES-CONTAINER')
    );
  }
};


// execute INIT au chargement du script content (au moment ou le DOM a fini de charger).
INIT();
