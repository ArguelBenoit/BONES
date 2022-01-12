import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'Components/list-item.js';
import 'Styles/list.less';


const List = props => {
  const { list, type, emptyMessage } = props;

  if (list.length === 0) {
    return <div className="list-empty u-themecolor-container u-padding u-themecolor-color u-text-center u-font-size-s">
      <i>{emptyMessage}</i>
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
  type: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired
};


export default List;
