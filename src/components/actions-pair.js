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
    <button
      className="action"
      onClick={() => changeRoute({ name: 'Share', uuid })}
    >
      <img src={share} />
    </button>
    <button
      className="action"
      onClick={() => changeRoute({ name: 'FormPair', uuid })}
    >
      <img src={edit} />
    </button>
    <button
      className="action"
      onClick={() => Bus.dispatch('ModalPrompt', dataRemoveAction)}
    >
      <img src={trash} />
    </button>
  </div>;
};


ActionsPair.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsPair;
