import React from 'react';
import PropTypes from 'prop-types';
import share from 'Images/icons/share.png';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.js';
import Bus from 'Bin/bus.js';
import { usePairsContext } from 'Contexts/pairs.js';
import i18 from 'Bin/i18.js';


const ActionsPair = ({ item }) => {

  const { remove } = usePairsContext();
  const { uuid, label } = item;
  const { changeRoute } = useRouterContext();

  const dataRemoveAction = {
    message: `${i18('actionPair')}"${label}" ?`,
    action: () => {
      remove(uuid);
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
      onClick={() => Bus.dispatch('ModalPrompt', dataRemoveAction)}
    />
  </div>;
};


ActionsPair.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsPair;
