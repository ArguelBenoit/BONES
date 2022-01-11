import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'Components/list-item.js';
import 'Styles/list.less';


const List = props => {
  const { list, type } = props;

  let empty = '';
  if (type === 'pair') {
    empty =
      'BONES does not have your keys. To encrypt and decrypt your messages BONES needs a pair of RSA 2048 keys.';
  } else if (type === 'friend') {
    empty =
      'BONES does not have any public key from your friends. To decrypt their encrypted message, it is necessary to have their public key.';
  } else if (type === 'method') {
    empty =
      'BONES does not have any methodes. Methods are key bindings attached to a url.';
  }

  if (list.length === 0) {
    return <div className="list-empty u-themecolor-container u-padding u-themecolor-color u-text-center u-font-size-s">
      <i>{empty}</i>
    </div>;

  } else {
    return <div className="u-themecolor-container">
      <div className="list">
        {list.map(item => {
          return <ListItem
            key={item.uuid}
            item={item}
            type={type}
          />;
        })}
      </div>
    </div>;
  }
};


List.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};


export default List;
