import React, { useState } from 'react';
import Bus from 'Bin/bus.js';
import Loading from 'Components/loading.js';
import i18 from 'Bin/i18.js';


const ModalLoading = () => {

  const [ active, setActive ] = useState(false);

  Bus.subscribe('ModalLoading', data => setActive(data));

  const loadingHtml = <div className="modal">
    <div className="modal-content">
      <div style={{ display: 'inline-block', margin: 'auto'}}>
        <Loading size={100}/>
      </div>
      <div dangerouslySetInnerHTML={{__html: i18('loading')}} />{/* eslint-disable-line */}
    </div>
  </div>;

  return active ? loadingHtml : '';

};


export default ModalLoading;
