import React, { useState } from 'react';
import headFail from 'Images/bones/head-fail.png';
import Bus from 'Utils/bus.js';


const stylePrompt = {
  height: '100vh',
  width: '100%',
  top: 0,
  left: 0,
  position: 'fixed',
  zIndex: 2,
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  lineHeight: '26px'
};


const initialState = {
  active: false,
  action: () => {},
  message: ''
};


const Prompt = () => {

  const [ state, setState ] = useState(initialState);

  Bus.subscribe('prompt', ({ message, action }) => {
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

    return <div style={stylePrompt}>
      <div style={{width: '100%'}}>
        <div style={{display: 'flex'}}>
          <img
            style={{margin: 'auto'}}
            src={headFail}
            width="90"
          />
        </div>
        <div
          className="u-margin-bottom-s"
          style={{
            margin: 'auto',
            textAlign: 'center',
            width: 220,
            paddingBottom: 15
          }}
        >
          {message}
        </div>
        <div className="u-flex" style={{width: 160, margin: 'auto'}}>
          <button
            className="no-button-alert general-button"
            onClick={clickNo}
            style={{fontSize: '85%'}}
          >
            NO
          </button>
          <button
            className="yes-button-alert general-button"
            onClick={clickYes}
            style={{fontSize: '85%'}}
          >
            YES
          </button>
        </div>
      </div>
    </div>;

  } else {

    return '';
  }

};


export default Prompt;
