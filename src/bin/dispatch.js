import { handlers } from 'Bin/handlers.js';


export const dispatchUpdate = () => {
  // dispatch toolbox on content-script
  handlers.webExt().tabs.query({}).then(tabs => {
    tabs.forEach(({ id }) => {
      handlers.webExt().tabs.sendMessage(id, { message: 'yolo' });
    });
  });

  // dispatch to popup
  handlers.webExt().runtime.sendMessage({ message: 'yolo' });

  // dispatch to settings page(s)
  handlers.webExt().tabs.query({ title: 'BONES !#@$' }).then(tabs => {
    tabs.forEach(({ id }) => {
      handlers.webExt().tabs.sendMessage(id, { message: 'yolo' });
    });
  });

};



export const subscribeUpdate = callback => {

  handlers.webExt().runtime.onMessage.addListener(() => {
    callback();
  });

};
