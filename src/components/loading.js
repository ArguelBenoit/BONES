import React, { useState } from 'react';
import loadingImg from 'Images/bones/loading.gif';
import Bus from 'Utils/bus.js';


const styleLoading = {
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


const Loading = () => {

  const [ active, setActive ] = useState(false);

  Bus.subscribe('loading', data => setActive(data));

  const loadingHtml = <div style={styleLoading}>
    <div style={{width: '100%'}}>
      <div style={{display: 'flex'}}>
        <img
          style={{margin: 'auto'}}
          src={loadingImg}
          width="90"
        />
      </div>
      <div style={{textAlign: 'center'}}>
        BONES is working.<br/>Don't touch <b>anything</b>!
      </div>
    </div>
  </div>;

  return active ? loadingHtml : '';

};


export default Loading;
