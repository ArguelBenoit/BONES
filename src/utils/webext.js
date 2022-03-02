
/*
Utiliser cette fonction permet d'unifier les développements pour toutes les plateformes.
Il retourne l'objet chrome pour chrome et tout les naviguateurs basé sur chromium (edge, opera, brave...)
Il retourne l'object browser pour firefox
*/

export default () => {

  // alors c'est firefox
  if (typeof chrome === 'undefined') {
    return browser;
  // alors c'est chrome
  } else if (typeof browser === 'undefined') {
    return chrome;
  }

};
