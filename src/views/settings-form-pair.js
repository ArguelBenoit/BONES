import React, { useState } from 'react';
import ReturnLink from 'Components/return-link.js';
import { useRouterContext } from 'Contexts/router.js';
import { usePairsContext } from 'Contexts/pairs.js';
import { generating, checkPrivate, checkPublic } from 'Bin/domain/keys.js';
import FieldError from 'Components/field-error.js';
import Bus from 'Bin/bus.js';
import i18 from 'Bin/i18.js';


let initialStateValue = {
  label: '',
  private: '',
  public: ''
};


const initialStateValidator = {
  label: 0,
  private: 0,
  public: 0
};


const SettingsFormPair = () => {

  const { changeRoute, route } = useRouterContext();
  const { add, get: getPair, modify } = usePairsContext();
  const editMode = route.uuid ? true : false;

  const [ stateValidator, setStateValidator ] = useState(initialStateValidator);
  const [ stateValue, setStateValue ] = useState(
    editMode
      ? getPair(route.uuid)
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


  const clickGenerating = () => {
    Bus.dispatch('ModalLoading', true);
    setTimeout(() => {
      let pairGenerated = generating();
      setStateValue(
        {
          ...stateValue,
          private: pairGenerated.private.trim(),
          public: pairGenerated.public.trim()
        }
      );
      Bus.dispatch('ModalLoading', false);
    }, 50);
  };


  const checkValidator = () => {
    // 0 = OK, 1 = vide, 2 = rsa non valid
    let validator = {
      label: 0,
      private: 0,
      public: 0
    };

    if (!stateValue.label || stateValue.label === '')
      validator.label = 1;
    if (!checkPublic(stateValue.public))
      validator.public = 2;
    if (!checkPrivate(stateValue.private))
      validator.private = 3;
    if (!stateValue.private || stateValue.private === '')
      validator.private = 1;
    if (!stateValue.public || stateValue.public === '')
      validator.public = 1;

    return validator;
  };


  const save = () => {
    const validator = checkValidator();

    if (validator.label + validator.private + validator.public === 0) {
      if (editMode) {
        modify(route.uuid, {
          label: stateValue.label,
          private: stateValue.private,
          public: stateValue.public
        });
      } else {
        add({
          label: stateValue.label,
          private: stateValue.private,
          public: stateValue.public
        });
      }
      Bus.dispatch('ModalSuccess', i18('successPair'));
      changeRoute({ name: 'SettingsIndex' });

    } else {
      setStateValidator(validator);
    }
  };


  return <div className="content">
    <ReturnLink />
    <h1><span>{i18(editMode ? 'edit' : 'add')}</span>{i18('pairFormEditTitle')}</h1>
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
          <FieldError status={stateValidator.label} />
        </div>
      </div>

      <div className="u-border u-margin-top-s u-themecolor-color u-themecolor-container u-padding-s">
        <i>{i18('pairFormWarn')}</i>
        <button
          className="general-button generate-button u-margin-top-m"
          onClick={() => clickGenerating()}
        >
          {i18('pairFormGenerate')}
        </button>
      </div>

      {/* private key */}
      <div className="u-margin-top-s">
        <label>{i18('pairFormPriLabel')}</label>
        <textarea
          name="name"
          rows="8"
          cols="80"
          placeholder={i18('pairFormPriPlaceholder')}
          value={stateValue.private}
          data-key-state="private"
          onChange={handlerSetValue}
        />
        <FieldError status={stateValidator.private} />
      </div>

      {/* public key */}
      <div className="u-margin-top-s">
        <label>{i18('pairFormPubLabel')}</label>
        <textarea
          name="name"
          rows="8"
          cols="80"
          placeholder={i18('pairFormPubPlaceholder')}
          value={stateValue.public}
          data-key-state="public"
          onChange={handlerSetValue}
        />
        <FieldError status={stateValidator.public} />
      </div>
    </div>

    <button
      onClick={() => save()}
      className="general-button generate-button u-margin-top-s save-keys"
    >
      {i18('pairFormSave')}
    </button>
  </div>;
};

export default SettingsFormPair;
