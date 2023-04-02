import { useState } from 'react';
import headFail from 'Images/bones/head-fail.png';
import Bus from 'Bin/bus.js';
import i18 from 'Bin/i18.js';


const initialState = {
  active: false,
  action: () => {},
  message: ''
};


const ModalPrompt = () => {

  const [ state, setState ] = useState(initialState);

  Bus.subscribe('ModalPrompt', ({ message, action }) => {
    setState({
      active: true,
      message,
      action
    });
  });


  if (state.active) {
    const { message, action } = state;
    const clickNo = () => {
      setState(initialState);
    };
    const clickYes = () => {
      action();
      setState(initialState);
    };

    return <div className="modal">
      <div className="modal-content">
        <img
          src={headFail}
          width="90"
        />
        <div>
          {message}
        </div>
        <div className="modal-buttons">
          <button onClick={clickNo}>
            {i18('no')}
          </button>
          <button onClick={clickYes}>
            {i18('yes')}
          </button>
        </div>
      </div>
    </div>;

  } else {

    return '';
  }

};


export default ModalPrompt;
