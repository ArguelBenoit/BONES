import { useState } from 'react';
import head from 'Images/bones/head-regular.png';
import Bus from 'Bin/bus.js';
import { manager } from 'Bin/storage/manager.js';
import i18 from 'Bin/i18.js';


const ModalImportDb = () => {

  const [ state, setState ] = useState({ active: false });

  Bus.subscribe('ModalImportDB', () => {
    setState({
      active: true
    });
  });

  const remove = () => {
    setState({ active: false });
  };

  const updateImport = e => {
    var reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = event => {
      const obj = JSON.parse(event.target.result);
      manager.importNewStorage(obj).then(() => {
        location.reload();
      });
    };
  };

  const view = <div className="modal">
    <div className="modal-content">
      <img
        src={head}
        width="90"
      />
      <div>
        {i18('actionImport')}<br/>
      </div>
      <div className="modal-buttons">
        <button className="left" onClick={remove}>
          {i18('cancel')}
        </button>
        <label className="right" htmlFor="file-upload" onMouseDown={e => e.preventDefault()}>
          {i18('import')}
        </label>
        <input
          onMouseDown={e => e.preventDefault()}
          id="file-upload"
          type="file"
          accept="application/json"
          onChange={updateImport}
        />
        <input type="file"/>
      </div>
    </div>
  </div>;

  return state.active ? view : '';

};


export default ModalImportDb;
