import { useState } from 'react';
import { checkPublic, checkPrivate } from 'Utils/keys.js';



// useForm offre des hooks de mise à jour des champs ainsi que des status de validation.
// les deux paramètres sont impératif et l'atribue data-key-state est imperatif dans chaque input
function useForm(initialStateValue, initialStateValidator) {

  const [ stateValue, setStateValue ] = useState(initialStateValue);
  const [ stateValidator, setStateValidator ] = useState(initialStateValidator);

  // mise a jour des valeurs
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


  // mise à jour des status de validation // value = 0, 1, 2, 3...
  const checkValidations = () => {

    let keys = Object.keys(stateValidator);
    let newStateValidator = stateValidator;

    for (let key of keys) {
      const { type } = stateValidator[key];
      const value = stateValue[key].value;

      console.log(key);

      switch (type) {
        case 'string':
          if (!value || value === '') {
            newStateValidator[key].value = 1;
          } else {
            newStateValidator[key].value = 0;
          }
          break;

        case 'public-key':
          console.log(value);
          if (!checkPublic(value)) {
            newStateValidator[key].value = 2;
          } else if (!value || value === '') {
            newStateValidator[key].value = 1;
          } else {
            newStateValidator[key].value = 0;
          }
          break;

        case 'private-key':
          if (!checkPrivate(value)) {
            newStateValidator[key].value = 2;
          } else if (!value || value === '') {
            newStateValidator[key].value = 1;
          } else {
            newStateValidator[key].value = 0;
          }
      }

    }

    console.log(newStateValidator);

    setStateValidator(newStateValidator);
  };


  return [
    handlerSetValue,
    stateValue,
    checkValidations,
    stateValidator
  ];
}

export default useForm;
