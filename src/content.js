import React from 'react';
import { render } from 'react-dom';
import ToolBox from 'Components/tool-box.js';
/* storage */
import { Storage } from 'Utils/storage.js';
const methodStore = new Storage('method');



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

    const updateMethod = (key, value) => {
      methodStore.modify(methodActive.uuid, { [key]: value });
    };

    // initialisation de la toolbox
    render(
      <ToolBox
        method={methodActive}
        updateMethod={updateMethod}
      />,
      document.getElementById('BONES-CONTAINER')
    );
  }

})();
