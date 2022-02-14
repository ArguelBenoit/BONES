import React, { useState } from 'react';
import ReturnLink from 'Components/return-link.js';
import { useRouterContext } from 'Contexts/router.js';
import { useMethodsContext } from 'Contexts/methods.js';
import { usePairsContext } from 'Contexts/pairs.js';
import Bus from 'Utils/bus.js';
import FieldError from 'Components/field-error.js';
import FieldFriends from 'Components/field-friends.js';


let initialStateValue = {
  label: '',
  url: '',
  pair: '',
  friends: ['']
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
  const { pairs } = usePairsContext();
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


  const handlerSetValueFriends = value => {
    setStateValue({
      ...stateValue,
      friends: value
    });
    // remise à 0 de la validation
    resetValidation('friends');
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
      url: 0,
      pair: 0,
      friends: 0
    };

    if (!stateValue.label || stateValue.label === '')
      validator.label = 1;
    if (!stateValue.url || stateValue.url === '')
      validator.url = 1;
    if (!stateValue.pair || stateValue.pair === '')
      validator.pair = 1;

    let friendsField = false;
    stateValue.friends.forEach(item => {
      if (item && item !== '') {
        friendsField = true;
      }
    });

    if (!friendsField) {
      validator.friends = 1;
    }

    return validator;
  };


  const cleanedFriends = () => {
    return stateValue
      .friends
      .filter(el => el !== '')
      .filter((el, i, self) => i === self.indexOf(el));
  };


  const save = () => {
    const validator = checkValidator();

    if (validator.label + validator.url + validator.pair + validator.friends === 0) {
      if (editMode) {
        modify(route.uuid, {
          label: stateValue.label,
          url: stateValue.url,
          pair: stateValue.pair,
          friends: cleanedFriends()
        });
      } else {
        add({
          label: stateValue.label,
          url: stateValue.url,
          pair: stateValue.pair,
          friends: cleanedFriends()
        });
      }
      Bus.dispatch('ModalSuccess', 'Your method has been saved');
      changeRoute({ name: 'Index' });

    } else {
      setStateValidator(validator);
    }
  };


  return <div className="content">
    <ReturnLink />
    <h1><span>{editMode ? 'Edit' : 'Add'}</span> a method</h1>

    <div className="form">

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
        >
          <option key="--" value="">--</option>
          {pairs.pairs.map(
            pair => <option
              key={pair.uuid}
              value={pair.uuid}
            >
              {pair.label}
            </option>
          )}
        </select>
        <FieldError status={stateValidator.pair} />
      </div>

      <FieldFriends
        updateParent={handlerSetValueFriends}
        initialState={stateValue.friends}
      />
      <FieldError status={stateValidator.friends} />

    </div>

    <button
      onClick={() => save()}
      className="general-button generate-button u-margin-top-s save-keys"
    >
      Save your method
    </button>

  </div>;
};

export default FormMethod;
