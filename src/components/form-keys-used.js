import React, { useState } from 'react';
import { usePairsContext } from 'Contexts/pairs.js';
import { useSettingsContext } from 'Contexts/settings.js';
// import Bus from 'Bin/bus.js';
import FieldFriends from 'Components/field-friends.js';
import i18 from 'Bin/i18.js';



const FormKeysUsed = () => {

  const { pairs } = usePairsContext();
  const {
    get: settings,
    modify: storeModify
  } = useSettingsContext();

  const [ stateValue, setStateValue ] = useState({
    pair: settings().pair,
    friends: settings().friends
  });


  const handlerSetPair = event => {
    const { value } = event.target;
    storeModify({ pair: value });
    setStateValue({
      ...stateValue,
      pair: value
    });
  };


  const handlerSetValueFriends = value => {
    storeModify({ friends: cleanedValue(value) });
    setStateValue({
      ...stateValue,
      friends: value
    });
  };

  const cleanedValue = value => {
    return value.filter(el => el !== '');
  };

  return <>
    <label>{i18('keysUsedPair')}</label>
    <select
      type="select"
      value={stateValue.pair}
      onChange={handlerSetPair}
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

    <FieldFriends
      updateParent={handlerSetValueFriends}
      initialState={stateValue.friends}
    />

  </>;
};



export default FormKeysUsed;
