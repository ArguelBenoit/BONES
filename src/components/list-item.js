import React from 'react';
import PropTypes from 'prop-types';
import ActionsPair from 'Components/actions-pair.js';
import ActionsFriend from 'Components/actions-friend.js';


const ListItem = props => {

  const { item, type } = props;

  return <div className="item u-flex">
    <div className="u-full-width name">
      {item.label}
    </div>
    <div className="u-flex">
      {
        type === 'pair'
          ? <ActionsPair item={item} />
          : ''
      }
      {
        type === 'friend'
          ? <ActionsFriend item={item} />
          : ''
      }
    </div>
  </div>;
};


ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};


export default ListItem;
