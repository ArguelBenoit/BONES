import React, { useState } from 'react';
import Bus from 'Utils/bus.js';
import Loading from 'Components/loading.js';



const ModalLoading = () => {

  const [ active, setActive ] = useState(false);

  Bus.subscribe('ModalLoading', data => setActive(data));

  const loadingHtml = <div className="modal">
    <div className="modal-content">
      <div style={{ display: 'inline-block', margin: 'auto'}}>
        <Loading size={100}/>
      </div>
      <div>
        BONES is working.<br/>Don't touch <b>anything</b>!
      </div>
    </div>
  </div>;

  return active ? loadingHtml : '';

};


export default ModalLoading;
