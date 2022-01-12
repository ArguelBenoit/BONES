import React from 'react';
import PropTypes from 'prop-types';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Utils/bus.js';
import { useFriendsContext } from 'Contexts/friends.js';


const ActionsFriend = ({ item }) => {

  const { remove } = useFriendsContext();
  const { uuid, label } = item;
  const { changeRoute } = useRouterContext();

  const dataRemoveAction = {
    message: `Do you really want to delete public key "${label}" ?`,
    action: () => {
      remove(uuid);
    }
  };

  return <div className="u-flex">
    <img
      src={edit}
      height="18"
      width="18"
      className="action"
      onClick={() => changeRoute({ name: 'FormFriend', uuid })}
    />
    <img
      src={trash}
      height="18"
      width="18"
      className="action"
      onClick={() => Bus.dispatch('prompt', dataRemoveAction)}
    />
  </div>;
};


ActionsFriend.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsFriend;
