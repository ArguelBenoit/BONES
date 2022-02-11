import React, { useState } from 'react';
import { useFriendsContext } from 'Contexts/friends.js';
import PropTypes from 'prop-types';


const FieldFriends = ({ updateParent, initialState }) => {

  const { friends } = useFriendsContext();
  const [ fields, setFields ] = useState({ value: initialState });


  const addFriend = () => {
    const newValue = [...fields.value, '--'];
    setFields({ value: newValue });
    updateParent(newValue);
  };


  const handlerChange = event => {
    const { index } = event.target.dataset;
    const { value } = event.target;

    if (value === '--' && fields.value.length > 1) {
      let tempValues = fields.value;
      tempValues.splice(index, 1);
      setFields({ value: tempValues });
      updateParent(tempValues);

    } else {
      let tempValues = fields.value;
      tempValues[index] = value;
      setFields({ value: tempValues });
      updateParent(tempValues);
    }
  };


  return <div className="u-margin-top-s">
    <div style={{marginBottom: 10}}>Friend's key</div>
    <div className="u-padding u-themecolor-container repeat-select u-border">
      <div className="container-multiple-select">

        {fields.value.map((val, i) =>

          <select
            value={fields.value[i]}
            onChange={handlerChange}
            data-index={i}
            key={`select-${i}`}
            style={i === 0 ? { marginTop: 0 } : {}}
          >
            <option value="--" key={'no-value-' + i}>--</option>
            {friends.friends.map(el =>
              <option value={el.uuid} key={`${el.uuid}-${i}`}>
                {el.label}
              </option>
            )}
          </select>

        )}

      </div>
        {
          fields.value.length < friends.friends.length
            ?
              <button
                onClick={addFriend}
                className="general-button u-margin-top-s add-select"
              >
                Add another friend
              </button>
            :
              ''
          }
    </div>
  </div>;

};


FieldFriends.propTypes = {
  initialState: PropTypes.array.isRequired,
  updateParent: PropTypes.func.isRequired
};


export default FieldFriends;