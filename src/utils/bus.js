
/*
Système de bus d'evenements
---------------------------
- exclusivement l'activation et la désactivation des composants de 1er niveau (loading, promp, toast...) et le routing
- Aucun storage de data. Pour les données, on utilse l'implémentation de la logique redux avec l'api context
- Les noms de subscribe sont a usage unique
*/

const Bus = {
  /* stoquage des différents evenements inscrits */
  events: {},
  /* déclanche un evenement */
  dispatch: function(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  },
  /* inscrit un nouvel evenement */
  subscribe: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  /* désinscrit un evenement */
  unSubscribe: function(event) {
    delete this.events[event];
  }
};

export default Bus;
