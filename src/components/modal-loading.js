import React, { useState } from 'react';
import loadingImg from 'Images/bones/loading.gif';
import Bus from 'Utils/bus.js';


const ModalLoading = () => {

  const [ active, setActive ] = useState(false);

  Bus.subscribe('ModalLoading', data => setActive(data));

  const loadingHtml = <div className="modal">
    <div className="modal-content">
      <img
        style={{margin: 'auto'}}
        src={loadingImg}
        width="90"
      />
      <div>
        BONES is working.<br/>Don't touch <b>anything</b>!
      </div>
    </div>
  </div>;

  return active ? loadingHtml : '';

};


export default ModalLoading;
