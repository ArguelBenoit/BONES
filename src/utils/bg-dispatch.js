
/* Déclanche un evenement vers le script background.js */
export default chanel => {

  const myPort = browser.runtime.connect({ name: 'BONES' });
  myPort.postMessage({ chanel });

};
