import React, { useState } from 'react';
import ReturnLink from 'Components/return-link.js';
import { useRouterContext } from 'Contexts/router.js';
import { useFriendsContext } from 'Contexts/friends.js';
import { checkPublic } from 'Utils/domain/keys.js';
import Bus from 'Utils/bus.js';
import i18 from 'Utils/i18.js';


let initialStateValue = {
  label: '',
  public: ''
};


const initialStateValidator = {
  label: 0,
  public: 0
};


const FormFriend = () => {

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
      Bus.dispatch('ModalSuccess', 'Well done, your friend\'s key has been saved.');
      changeRoute({ name: 'Index' });

    } else {
      setStateValidator(validator);
    }
  };


  return <div className="content">
    <ReturnLink />
    <h1><span>{editMode ? 'Edit' : 'Add'}</span> a friend's key</h1>
    <div className="form">
      {/* label */}
      <div className="u-margin-top-m">
        <div className="u-margin-top-s">
          <label>{i18('label')}</label>
          <input
            type="text"
            className="input-label"
            value={stateValue.label}
            data-key-state="label"
            onChange={handlerSetValue}
          />
          {stateValidator.label === 1
            ? <span className="form-error">This field is required</span>
            : ''
          }
        </div>
      </div>


      {/* public key */}
      <div className="u-margin-top-s">
        <label>Public key of your friend</label>
        <textarea
          name="name"
          rows="8"
          cols="80"
          placeholder="Paste public RSA 2048 key here"
          value={stateValue.public}
          data-key-state="public"
          onChange={handlerSetValue}
        />
        {stateValidator.public === 1
          ? <span className="form-error">This field is required</span>
          : ''
        }
        {stateValidator.public === 2
          ? <span className="form-error">This is not a RSA public key</span>
          : ''
        }
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

export default FormFriend;
