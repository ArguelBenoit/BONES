import React, { useState } from 'react';
import head from 'Images/bones/head-regular.png';
import Bus from 'Utils/bus.js';
import { tools } from 'Utils/tools.js';
import { Storage } from 'Utils/storage.js';
const store = new Storage();


const styleDump = {
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


const DumpDb = () => {

  const [ state, setState ] = useState({ active: false, jsDb: {} });

  Bus.subscribe('dumpDB', () => {
    store.getAll().then(jsDb => {
      setState({
        active: true,
        jsDb
      });
    });
  });


  const remove = () => {
    setState({ active: false, db: {} });
  };

  const data = new Blob(
    [JSON.stringify(state.jsDb, null, 2)],
    {
      type: 'application/json'
    }
  );

  const dumpMessage = <div style={styleDump}>
    <div style={{width: '100%'}}>
      <div style={{display: 'flex'}}>
        <img
          style={{margin: 'auto'}}
          src={head}
          width="90"
        />
      </div>
      <div style={{textAlign: 'center', width: 240, margin: 'auto'}}>
        BONES has created a dump of your database, download it&nbsp;
        <a
          id="download_link"
          download={`bones_${tools.date()}.json`}
          href={window.URL.createObjectURL(data)}
        >
          here
        </a>
        &nbsp;or&nbsp;
        <span
          id="cancel_link"
          className="link"
          onClick={remove}
        >
          cancel
        </span>
      </div>
    </div>
  </div>;

  return state.active ? dumpMessage : '';

};


export default DumpDb;
