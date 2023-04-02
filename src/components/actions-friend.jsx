import PropTypes from 'prop-types';
import edit from 'Images/icons/edit.png';
import trash from 'Images/icons/trash.png';
import { useRouterContext } from 'Contexts/router.jsx';
import Bus from 'Bin/bus.js';
import { useFriendsContext } from 'Contexts/friends.jsx';
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
    <button
      className="action"
      onClick={() => changeRoute({ name: 'SettingsFormFriend', uuid })}
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


ActionsFriend.propTypes = {
  item: PropTypes.object.isRequired
};


export default ActionsFriend;
