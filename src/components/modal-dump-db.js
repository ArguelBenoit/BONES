import React, { useState } from 'react';
import head from 'Images/bones/head-regular.png';
import Bus from 'Utils/bus.js';
import { handlers } from 'Utils/handlers.js';
import { manager } from 'Utils/storage/manager.js';


const ModalDumpDb = () => {

  const [ state, setState ] = useState({ active: false, jsDb: {} });

  Bus.subscribe('ModalDumpDb', () => {
    manager.getAll().then(jsDb => {
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
          download={`bones_${handlers.date()}.json`}
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
