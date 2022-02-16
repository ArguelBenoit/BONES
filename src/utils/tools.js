
export const tools = {

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
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  },

  /* retourne un booléen qui valide le fonctionnement total du mode stupide */
  /* true = mode stupide actif + pair présente + et tableau d'amis avec au moins un ami */
  getStupidActive(settings) {
    if (settings === undefined) {
      return false;
    } else if (
      settings.stupid === true &&
      settings.pair && settings.pair !== '' &&
      settings.friends.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  },

  /* retourne un booléen qui valide l'activation de bones */
  getActivate(settings) {
    if (settings === undefined) {
      return true;
    } else if (settings.activate === true) {
      return true;
    } else {
      return false;
    }
  }

};
