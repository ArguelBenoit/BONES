
import Env from 'Env';
/* Utiliser ce module permet d'unifier les développements pour toutes les plateformes. Il
retourne l'objet chrome pour chrome et tout les naviguateurs basé sur chromium (edge, opera,
brave...) Il retourne l'object browser pour firefox */


export default () => {

  if (Env.bro === 'firefox')
    return browser;
  else if (Env.bro === 'chrome')
    return chrome;
  else
    return chrome;

};
