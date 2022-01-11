import React from 'react';
import PropTypes from 'prop-types';
import share from 'Images/icons/share.png';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Utils/bus.js';
import { Storage } from 'Utils/storage.js';
import { usePairsContext } from 'Contexts/pairs.js';


const ActionsPair = ({ item }) => {

  const storagePair = new Storage('pair');
  const { update } = usePairsContext();
  const { uuid, label } = item;
  const { changeRoute } = useRouterContext();

  const dataRemoveAction = {
    message: `Do you really want to delete public key "${label}" ?`,
    action: () => {
      storagePair.remove(uuid);
      update();
    }
  };

  return <div className="u-flex">
    <img
      src={share}
      height="18"
      width="18"
      className="small action"
      onClick={() => changeRoute({ name: 'Share', uuid })}
    />
    <img
      src={edit}
      height="18"
      width="18"
      className="small action"
      onClick={() => changeRoute({ name: 'FormPair', uuid })}
    />
    <img
      src={trash}
      height="18"
      width="18"
      className="small action"
      onClick={() => Bus.dispatch('prompt', dataRemoveAction)}
    />
  </div>;
};


ActionsPair.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsPair;
