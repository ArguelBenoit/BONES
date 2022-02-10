import React from 'react';
import PropTypes from 'prop-types';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Utils/bus.js';
import { useMethodsContext } from 'Contexts/methods.js';


const ActionsFriend = ({ item }) => {

  const { remove } = useMethodsContext();
  const { uuid, label } = item;
  const { changeRoute } = useRouterContext();

  const dataRemoveAction = {
    message: `Do you really want to delete the method "${label}" ?`,
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
      onClick={() => changeRoute({ name: 'FormMethod', uuid })}
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
