import React, { useState } from 'react';
import ReturnLink from 'Components/return-link.js';
import { useRouterContext } from 'Contexts/router.js';
import { useMethodsContext } from 'Contexts/methods.js';
import { checkPublic } from 'Utils/keys.js';
import Bus from 'Utils/bus.js';
import FieldError from 'Components/field-error.js';

let initialStateValue = {
  label: '',
  url: '',
  pair: '',
  friends: []
};


const initialStateValidator = {
  label: 0,
  url: 0,
  pair: 0,
  friends: 0
};


const FormMethod = () => {

  const { changeRoute, route } = useRouterContext();
  const { add, get: getMethod, modify } = useMethodsContext();
  const editMode = route.uuid ? true : false;

  const [ stateValidator, setStateValidator ] = useState(initialStateValidator);
  const [ stateValue, setStateValue ] = useState(
    editMode
      ? getMethod(route.uuid)
      : initialStateValue
  );


  const handlerSetValue = event => {
    const { keyState } = event.target.dataset;
    const { value } = event.target;
    setStateValue({
      ...stateValue,
      [keyState]: value
    });
    // remise à 0 de la validation
    resetValidation(keyState);
  };


  const resetValidation = key => {
    setStateValidator({
      ...stateValidator,
      [key]: 0
    });
  };


  const checkValidator = () => {
    // 0 = OK, 1 = vide, 2 = rsa non valid
    let validator = {
      label: 0,
      public: 0
    };

    if (!stateValue.label || stateValue.label === '')
      validator.label = 1;
    if (!checkPublic(stateValue.public))
      validator.public = 2;
    if (!stateValue.public || stateValue.public === '')
      validator.public = 1;

    return validator;
  };


  const save = () => {
    const validator = checkValidator();

    if (validator.label + validator.public === 0) {
      if (editMode) {
        modify(route.uuid, {
          label: stateValue.label,
          public: stateValue.public
        });
      } else {
        add({
          label: stateValue.label,
          public: stateValue.public
        });
      }
      Bus.dispatch('success', 'Your friend\'s key has been saved');
      changeRoute({ name: 'Index' });

    } else {
      setStateValidator(validator);
    }
  };


  return <div>
    <ReturnLink />

    <div className="u-margin-top-m">

      <div className="u-margin-top-s">
        <label>Label</label>
        <input
          type="text"
          value={stateValue.label}
          data-key-state="label"
          onChange={handlerSetValue}
        />
        <FieldError status={stateValidator.label} />
      </div>

      <div className="u-margin-top-s">
        <label>Url of thread</label>
        <input
          type="text"
          value={stateValue.url}
          data-key-state="url"
          onChange={handlerSetValue}
        />
        <FieldError status={stateValidator.url} />
      </div>

      <div className="u-margin-top-s">
        <label>Your pair key</label>
        <select
          type="select"
          value={stateValue.pair}
          data-key-state="pair"
          onChange={handlerSetValue}
        />
        <FieldError status={stateValidator.pair} />
      </div>

      {/*
        <div className="u-margin-top-s">
          <div>Friend's key</div>
          <div className="u-padding u-themecolor-container repeat-select u-border">
            <div className="container-multiple-select"/>
            <button className="general-button u-margin-top-s add-select">Add another friend</button>
          </div>
          <FieldError status={stateValidator.friends} />
        </div>
      */}

    </div>

    <button
      onClick={() => save()}
      className="general-button generate-button u-margin-top-s save-keys"
    >
      Save friend's key
    </button>
  </div>;
};

export default FormMethod;




// /* return array of friend selected */
// let friendValues = () => {
//   let friends = [];
//   containerRepeteurSelect
//     .childNodes
//     .forEach(select => {
//       const { value } = select;
//       // if value and check if is not present
//       if (value && friends.indexOf(value) < 0) {
//         friends.push(value);
//       }
//     });
//   return friends;
// };
//
//
// /******* save action  *******/
// document.querySelector('.save-key').onclick = () => {
//
//   // creating array of friends
//   let friends = friendValues();
//
//   // check empty fields
//   if (!inputLabel.value)
//     errorLabelEmpty.style.display = 'inherit';
//   if (!inputUrl.value)
//     errorUrlEmpty.style.display = 'inherit';
//   if (!selectPair.value)
//     errorPairEmpty.style.display = 'inherit';
//   if (friends.length === 0)
//     errorFriendEmpty.style.display = 'inherit';
//
//   // if all is valid
//   if (inputLabel.value && inputUrl.value && selectPair.value && friends.length > 0) {
//
//     if (!uuidEdition) { // this is not in edtion mode
//
//       // set new friend on browser storage
//       methodStore.set({
//         label: inputLabel.value,
//         url: inputUrl.value,
//         pair: selectPair.value,
//         friend: friends,
//         /* not in form */
//         open: true
//       }).then(() => {
//         /* toast and go back */
//         toast('Your method has been saved', 'success', true);
//       });
//
//     } else { // this is in edition mode
//
//       /*  set keys in storage */
//       methodStore.modify(uuidEdition, {
//         label: inputLabel.value,
//         url: inputUrl.value,
//         pair: selectPair.value,
//         friend: friends
//       }).then(() => {
//         /* toast and go back */
//         toast('Your method has been edited', 'success', true);
//       });
//     }
//   }
// };
//
//
//
// [
//   inputLabel,
//   inputUrl,
//   selectPair
// ].forEach(e => {
//   e.addEventListener('input', () => {
//     [
//       errorLabelEmpty,
//       errorUrlEmpty,
//       errorPairEmpty,
//       errorFriendEmpty
//     ].forEach(el => {
//       el.style.display = 'none';
//     });
//   });
// });
//
//
//
// let addListenerOnSelect = i => {
//   document.querySelector(`.container-multiple-select select:nth-of-type(${i+1})`)
//     .addEventListener('input', () => {
//       [
//         errorLabelEmpty,
//         errorUrlEmpty,
//         errorPairEmpty,
//         errorFriendEmpty
//       ].forEach(el => {
//         el.style.display = 'none';
//       });
//     });
// };
//
//
// const preloadValue = () => {
//
//   const urlParams = new URLSearchParams(window.location.search);
//   const hasUuid = urlParams.has('uuid');
//   uuidEdition = urlParams.get('uuid');
//
//
//   const getterPair = pairStore.getList();
//   const getterFriend = friendStore.getList();
//
//   let promiseArray = [getterPair, getterFriend];
//
//   if (hasUuid) { // edition mode so add getter model of form on promiseArray
//     let getterOne = methodStore.getOne(uuidEdition);
//     promiseArray = [getterPair, getterFriend, getterOne];
//   }
//
//   Promise.all(promiseArray)
//     .then(data => {
//
//       pairOptions = '<option value>--</option>';
//       data[0].forEach(el => {
//         pairOptions += `<option value="${el.uuid}">${el.label}</option>`;
//       });
//       selectPair.innerHTML = pairOptions;
//
//       friendOptions = '<option value>--</option>';
//       data[1].forEach(el => {
//         friendOptions += `<option value="${el.uuid}">${el.label}</option>`;
//       });
//
//       if (!hasUuid) {
//         containerRepeteurSelect.innerHTML = `<select class="select-friend">
//           ${friendOptions}
//         </select>`;
//
//         addListenerOnSelect(0);
//
//       } else if (hasUuid) {
//         inputLabel.value = data[2].label;
//         inputUrl.value = data[2].url;
//         selectPair.value = data[2].pair;
//
//         data[2].friend.forEach((val, i) => {
//           const newSelect = document.createElement('select');
//           newSelect.class = 'select-friend';
//           newSelect.innerHTML = friendOptions;
//           newSelect.value = val;
//           containerRepeteurSelect.appendChild(newSelect);
//           addListenerOnSelect(i);
//
//         });
//       }
//     });
//
// };
//
// document.addEventListener('DOMContentLoaded', preloadValue());
//
// addSelect.onclick = () => {
//   const newSelect = document.createElement('select');
//   newSelect.class = 'select-friend u-margin-top-s';
//   newSelect.innerHTML = friendOptions;
//   containerRepeteurSelect.appendChild(newSelect);
// };
