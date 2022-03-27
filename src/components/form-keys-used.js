import React, { useState } from 'react';
import { usePairsContext } from 'Contexts/pairs.js';
import { useSettingsContext } from 'Contexts/settings.js';
// import Bus from 'Utils/bus.js';
import FieldFriends from 'Components/field-friends.js';




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

  return <div className="u-themecolor-container u-padding">
    <label>Your pair key</label>
    <select
      type="select"
      value={stateValue.pair}
      onChange={handlerSetPair}
    >
      <option key="--" value="--">--</option>
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

  </div>;
};



export default FormKeysUsed;
