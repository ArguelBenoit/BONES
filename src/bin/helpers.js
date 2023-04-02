
export const helpers = {
  /* retourne un uuid */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  /* retourne une date mm-dd-yyyy */
  date() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janvier = 0
    const year = today.getFullYear();
    return `${month}-${day}-${year}`;
  },
  /* retourne un booléen qui valide l'activation de bones */
  getActivate(settings) {
    if (
      settings.activate === true &&
      settings.friends.length > 0 &&
      settings.pair !== ''
    ) {
      return true;
    } else {
      return false;
    }
  },
  /* Utiliser ce module permet d'unifier les développements pour toutes les plateformes. Il
  retourne l'objet chrome pour chrome et tout les naviguateurs basé sur chromium (edge, opera,
  brave...) Il retourne l'object browser pour firefox */
  webExt() {
    if (Env.bro === 'firefox') {
      return browser;
    } else if (Env.bro === 'chrome') {
      return chrome;
    } else {
      return chrome;
    }
  }
};
