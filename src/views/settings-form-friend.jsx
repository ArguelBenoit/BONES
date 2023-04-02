import { useState } from 'react';
import ReturnLink from 'Components/return-link.jsx';
import { useRouterContext } from 'Contexts/router.jsx';
import { useFriendsContext } from 'Contexts/friends.jsx';
import { checkPublic } from 'Bin/domain/keys.js';
import Bus from 'Bin/bus.js';
import i18 from 'Bin/i18.js';


let initialStateValue = {
  label: '',
  public: ''
};


const initialStateValidator = {
  label: 0,
  public: 0
};


const SettingsFormFriend = () => {

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
      Bus.dispatch('ModalSuccess', i18('successFriend'));
      changeRoute({ name: 'SettingsIndex' });

    } else {
      setStateValidator(validator);
    }
  };


  return <div className="content">
    <ReturnLink />
    <h1><span>{i18(editMode ? 'edit' : 'add')}</span>{i18('friendFormEditTitle')}</h1>
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
            ? <span className="form-error">{i18('fieldRequired')}</span>
            : ''
          }
        </div>
      </div>


      {/* public key */}
      <div className="u-margin-top-s">
        <label>{i18('friendFormPubLabel')}</label>
        <textarea
          name="name"
          rows="8"
          cols="80"
          placeholder={i18('friendFormPubPlaceholder')}
          value={stateValue.public}
          data-key-state="public"
          onChange={handlerSetValue}
        />
        {stateValidator.public === 1
          ? <span className="form-error">{i18('fieldRequired')}</span>
          : ''
        }
        {stateValidator.public === 2
          ? <span className="form-error">{i18('fieldNoPublic')}</span>
          : ''
        }
      </div>
    </div>

    <button
      onClick={() => save()}
      className="general-button generate-button u-margin-top-s save-keys"
    >
      {i18('friendFormSave')}
    </button>
  </div>;
};

export default SettingsFormFriend;
