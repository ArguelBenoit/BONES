import React, { useState } from 'react';
import successImg from 'Images/bones/head-success.png';
import Bus from 'Utils/bus.js';


const styleSuccess = {
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


const Success = () => {

  const [ state, setState ] = useState({ active: false, message: '' });

  Bus.subscribe('success', message => {
    setState({ active: true, message });
    setTimeout(() => {
      setState({ active: false, message: '' });
    }, 3000);
  });

  const { active, message } = state;

  const successHtml = <div style={styleSuccess}>
    <div style={{width: '100%'}}>
      <div style={{display: 'flex'}}>
        <img
          style={{margin: 'auto'}}
          src={successImg}
          width="90"
        />
      </div>
      <div style={{textAlign: 'center'}}>
        {message}
      </div>
    </div>
  </div>;

  return active ? successHtml : '';

};


export default Success;
