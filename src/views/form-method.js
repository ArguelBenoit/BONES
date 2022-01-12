import React, { useState } from 'react';
import ReturnLink from 'Components/return-link.js';
import { useRouterContext } from 'Contexts/router.js';
import { useFriendsContext } from 'Contexts/friends.js';
import { checkPublic } from 'Utils/keys.js';
import Bus from 'Utils/bus.js';


let initialStateValue = {
  label: '',
  public: ''
};


const initialStateValidator = {
  label: 0,
  public: 0
};


const FormMethod = () => {

  const { changeRoute, route } = useRouterContext();
  const { add, get: getFriend, modify } = useFriendsContext();
  const editMode = route.uuid ? true : false;

  const [ stateValidator, setStateValidator ] = useState(initialStateValidator);
  const [ stateValue, setStateValue ] = useState(
    editMode
      ? getFriend(route.uuid)
      : initialStateValue
  );


  const handlerSetValue = event => {
    const { keyState } = event.target.dataset;
    const { value } = event.target;
    setStateValue({
      ...stateValue,
      [keyState]: value
    });
    // remise à 0 des validations
    setStateValidator(initialStateValidator);
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
        <input type="text" className="input-label"/>
        <span className="error-label-empty error">This field is required</span>
      </div>

      <div className="u-margin-top-s">
        <label>Url of thread</label>
        <input type="text" className="input-url"/>
        <span className="error-url-empty error">This field is required</span>
      </div>

      <div className="u-margin-top-s">
        <label>Your pair key</label>
        <select className="select-pair"/>
        <span className="error-pair-empty error">This field is required</span>
      </div>
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
