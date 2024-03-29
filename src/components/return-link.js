import React from 'react';
import arrow from 'Images/bones/arrow.png';
import i18 from 'Bin/i18.js';
import { useRouterContext } from 'Contexts/router.js';


const ReturnLink = () => {

  const { changeRoute } = useRouterContext();

  return <button
    className="return-link"
    onClick={() => changeRoute({ name: 'SettingsIndex' })}
  >
    <img src={arrow} width="26" height="18"/>
    {i18('goBack')}
  </button>;

};


export default ReturnLink;
