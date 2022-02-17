
/* Déclanche un evenement vers le script background.js */
export default chanel => {

  console.log('context-dispatch : ', chanel);
  const betweenContext = browser.runtime.connect({ name: 'BONES' });
  betweenContext.postMessage({ chanel });

};
