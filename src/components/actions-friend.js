import React from 'react';
import PropTypes from 'prop-types';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Bin/bus.js';
import { useFriendsContext } from 'Contexts/friends.js';
import i18 from 'Bin/i18.js';

const ActionsFriend = ({ item }) => {

  const { remove } = useFriendsContext();
  const { uuid, label } = item;
  const { changeRoute } = useRouterContext();

  const dataRemoveAction = {
    message: `${i18('actionsFriend')}"${label}" ?`,
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
      onClick={() => Bus.dispatch('ModalPrompt', dataRemoveAction)}
    />
  </div>;
};


ActionsFriend.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsFriend;
