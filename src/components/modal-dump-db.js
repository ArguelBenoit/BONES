import React, { useState } from 'react';
import head from 'Images/bones/head-regular.png';
import Bus from 'Utils/bus.js';
import { tools } from 'Utils/tools.js';
import { Storage } from 'Utils/storage.js';
const store = new Storage();


const ModalDumpDb = () => {

  const [ state, setState ] = useState({ active: false, jsDb: {} });

  Bus.subscribe('ModalDumpDb', () => {
    store.getAll().then(jsDb => {
      setState({
        active: true,
        jsDb
      });
    });
  });


  const remove = () => {
    setState({ active: false, jsDb: {} });
  };


  const data = new Blob(
    [JSON.stringify(state.jsDb, null, 2)],
    {
      type: 'application/json'
    }
  );


  const dumpMessage = <div className="modal">
    <div className="modal-content">
      <img
        src={head}
        width="90"
      />
      <div>
        BONES has created a dump of your database.
      </div>
      <div className="modal-buttons">
        <button onClick={remove}>
          CANCEL
        </button>
        <a
          download={`bones_${tools.date()}.json`}
          href={window.URL.createObjectURL(data)}
          onClick={remove}
        >
          DOWNLOAD
        </a>
      </div>
    </div>
  </div>;

  return state.active ? dumpMessage : '';

};


export default ModalDumpDb;
