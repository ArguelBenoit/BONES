// const drag = require('./drag.js');
// const utils = require('../core/utils.js');
// const Crypting = require('../core/crypting.js');
//
// /* storage */
// const Storage = require('../core/storage.js');
//
//
// /* add a tool box on a page by content script */
// module.exports = async () => {
//
//   const methodStore = new Storage('method');
//   const friendStore = new Storage('friend');
//   const pairStore = new Storage('pair');
//
//   const methods = await methodStore.keyValue('url', window.location.href);
//   const method = methods[0];
//
//   const friends = await friendStore.getList();
//   const pair = await pairStore.getOne(method.pair);
//
//   const crypting = new Crypting(friends, pair, method);
//
//   /* create element */
//   let div = document.createElement('div');
//
//   /* set div properties */
//   div.id = 'bones-tool-box';
//   div.className = method.open ? 'toggled' : '';
//
//   /* set content of div */
//   div.innerHTML = `<div>
//     <div class="content-shadow-one">
//       <!--  -->
//       <div class="bones-header">
//         <div class="bones-logo-header">
//           <!-- <img src="${browser.runtime.getURL('public/images/bones/loading.gif')}" width="60" height="60"/> -->
//           <img src="${browser.runtime.getURL('public/images/bones/head-regular.png')}" width="60" height="60"/>
//         </div>
//         <img class="toggle-header" id="toggle-header" src="${browser.runtime.getURL('public/images/bones/arrow.png')}" width="34"/>
//       </div>
//       <!--  -->
//       <div class="u-padding u-padding-top-s content">
//         <span class="u-themecolor-color label-method">${method.label}</span>
//         <!-- select text area (node) -->
//         <div class="u-padding-s u-themecolor-container-top u-text-center u-white-color u-font-size-l">Text-area watched</div>
//         <div class="u-themecolor-container-bottom u-padding-s">
//           <div style="display: ${method.node ? 'none' : 'inherit'}" id="selecting-element">
//             <button class="general-button u-full-width" id="select-textarea">Select text-area</button>
//             <!-- step txt -->
//             <div class="u-text-center" style="margin-top: 8px; color: red" id="action-required"><i>This action is required</i></div>
//             <div class="u-text-center u-themecolor-color" style="margin-top: 8px; display: none" id="action-txt">Click on the text-area in which you write your message</div>
//           </div>
//           <div style="display: ${method.node ? 'inherit' : 'none'}" id="selected-element">
//             <div class="u-flex">
//               <div class="u-full-width method-node">${method.node ? method.node.path : ''}</div>
//               <img src="${browser.runtime.getURL('public/images/icons/trash.png')}" height="18" width="18" class="small action img-trash" id="img-trash"/>
//             </div>
//           </div>
//         </div>
//         <!-- button decrypt encrypt -->
//         <div class="u-padding-s u-themecolor-container-top u-text-center u-white-color u-font-size-l u-margin-top-s">Actions</div>
//         <div class="u-themecolor-container-bottom u-padding-s container-buttons u-flex">
//           <div class="u-half-width" style="padding-right: 7.5px">
//             <button class="general-button u-full-width --color-one" id="decrypt-message">Decrypt</button>
//             <div class="u-text-center u-opacity-half" style="margin-top: 8px">Ctrl + j</div>
//           </div>
//           <div class="u-half-width" style="padding-left: 7.5px">
//             <button class="general-button u-full-width" id="encrypt-message">Encrypt</button>
//             <div class="u-text-center u-opacity-half" style="margin-top: 8px">Ctrl + k</div>
//           </div>
//         </div>
//         <!--  -->
//       </div>
//     </div>
//     <div class="content-shadow-two"></div>
//   </div>`;
//
//   /* add element into the dom */
//   document.body.prepend(div);
//
//   /* ref dom */
//   const selectingElement = document.querySelector('#selecting-element');
//   const selectedElement = document.querySelector('#selected-element');
//   const body = document.querySelector('body');
//   const actionRequired = document.querySelector('#action-required');
//   const actionTxt = document.querySelector('#action-txt');
//   const methodNode = document.querySelector('.method-node');
//   const bonesToolBox = document.querySelector('#bones-tool-box');
//   const imgTrash = document.querySelector('#img-trash');
//   const toggleHeader = document.querySelector('#toggle-header');
//   const selectTextArea = document.querySelector('#select-textarea');
//   const decryptMessage = document.querySelector('#decrypt-message');
//   const encryptMessage = document.querySelector('#encrypt-message');
//
//   /* delete textarea selected */
//   imgTrash.onclick = () => {
//     methodStore.modify(method.uuid, { node: null });
//     /* set selecting element */
//     selectingElement.style.display = 'inherit';
//     selectedElement.style.display = 'none';
//   };
//
//   /******* click button select area *******/
//   function selectNode(e) {
//     /* set element in storage */
//     const node = utils.getPath(e.target);
//     methodStore.modify(method.uuid, { node }).then(() => {
//       /* reset cursor */
//       body.style.cursor = 'inherit';
//       /* reset step txt */
//       actionRequired.style.display = 'inherit';
//       actionTxt.style.display = 'none';
//       /* set selected element */
//       selectingElement.style.display = 'none';
//       selectedElement.style.display = 'inherit';
//       methodNode.innerHTML = node.path;
//       method.node = node;
//     });
//   }
//   /* */
//   selectTextArea.onclick = e => {
//     e.stopPropagation();
//     /* set target cursor */
//     body.style.setProperty('cursor', 'cell', 'important');
//     /* */
//     actionRequired.style.display = 'none';
//     actionTxt.style.display = 'inherit';
//     /* watch click for get target */
//     document.addEventListener('click', selectNode, { once: true });
//   };
//
//   /* accordion trigger */
//   toggleHeader.onclick = () => {
//     const hasClass = bonesToolBox.classList.contains('toggled');
//     if (hasClass) {
//       bonesToolBox.classList.remove('toggled');
//       methodStore.modify(method.uuid, { open: false });
//     } else {
//       bonesToolBox.classList.add('toggled');
//       methodStore.modify(method.uuid, { open: true });
//     }
//   };
//
//   /* Make the DIV element draggable */
//   drag(bonesToolBox);
//
//   /* decrypt action */
//   const decryptAction = () => {
//     crypting.parse();
//   };
//   decryptMessage.onclick = decryptAction;
//
//   /* encrypt action */
//   const encryptAction = () => {
//     const key = method.node.isNativeInput ? 'value' : 'textContent';
//     const value = document.querySelector(method.node.path)[key];
//     const encryptedValue = crypting.encrypt(value);
//     document.querySelector(method.node)[key] = encryptedValue;
//   };
//   encryptMessage.onclick = encryptAction;
//
//   /* watch keydown */
//   document.addEventListener('keydown', e => {
//     if (e.ctrlKey) {
//       if (e.key === 'j') {
//         e.preventDefault();
//         decryptAction();
//       } else if (e.key === 'k') {
//         e.preventDefault();
//         encryptAction();
//       }
//     }
//   });
//
// };
