import React, { useState } from 'react';
import successImg from 'Images/bones/head-success.png';
import Bus from 'Bin/bus.js';



const ModalSuccess = () => {

  const [ state, setState ] = useState({ active: false, message: '' });

  Bus.subscribe('ModalSuccess', message => {
    setState({ active: true, message });
    setTimeout(() => {
      setState({ active: false, message: '' });
    }, 4500);
  });

  const { active, message } = state;

  const remove = () => {
    setState({ active: false, message: '' });
  };

  const successHtml = <div className="modal" onClick={remove}>
    <div className="modal-content">
      <img
        src={successImg}
        width="110"
      />
      <div className="u-margin-top-m">
        {message}
      </div>
    </div>
  </div>;

  return active ? successHtml : '';

};


export default ModalSuccess;
