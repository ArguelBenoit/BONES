import React from 'react';
import arrow from 'Images/bones/arrow.png';
import i18 from 'Utils/i18.js';
import { useRouterContext } from 'Contexts/router.js';


const ReturnLink = () => {

  const { changeRoute } = useRouterContext();

  return <div
    className="return-link"
    onClick={() => changeRoute({ name: 'Index' })}
  >
    <img src={arrow} width="26" height="18"/>
    {i18('goBack')}
  </div>;

};


export default ReturnLink;
