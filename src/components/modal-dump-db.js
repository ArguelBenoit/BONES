import React, { useState } from 'react';
import head from 'Images/bones/head-regular.png';
import Bus from 'Bin/bus.js';
import { helpers } from 'Bin/helpers.js';
import { manager } from 'Bin/storage/manager.js';
import i18 from 'Bin/i18.js';


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
        {i18('actionCreateDB')}
      </div>
      <div className="modal-buttons">
        <button onClick={remove}>
          {i18('cancel')}
        </button>
        <a
          download={`bones_${helpers.date()}.json`}
          href={window.URL.createObjectURL(data)}
          onClick={remove}
        >
          {i18('download')}
        </a>
      </div>
    </div>
  </div>;

  return state.active ? dumpMessage : '';

};


export default ModalDumpDb;
