import React, { useState } from 'react';
import { usePairsContext } from 'Contexts/pairs.js';
import { useSettingsContext } from 'Contexts/settings.js';
// import Bus from 'Utils/bus.js';
import FieldFriends from 'Components/field-friends.js';




const FormStupidMethod = () => {

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

    <div className="u-themecolor-color u-margin-bottom-s">
      The stupid mode activates bones on all pages with the settings entered below. This mode is required if you want to encrypt your emails. this mode is imperative to encrypt emails (the url changes for each email in email clients). All fields are required
    </div>
    <div>
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
    </div>

    <FieldFriends
      updateParent={handlerSetValueFriends}
      initialState={stateValue.friends}
    />

  </div>;
};



export default FormStupidMethod;
