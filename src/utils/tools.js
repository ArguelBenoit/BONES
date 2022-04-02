
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
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janvier = 0
    const year = today.getFullYear();
    return `${month}-${day}-${year}`;
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
