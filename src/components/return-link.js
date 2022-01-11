import React from 'react';
import cross from 'Images/bones/cross.png';
import { useRouterContext } from 'Contexts/router.js';


const ReturnLink = () => {

  const { changeRoute } = useRouterContext();

  return <div
    className="return-link"
    onClick={() => changeRoute({ name: 'Index' })}
  >
    <img src={cross} width="22" height="22" />
    GO BACK !
  </div>;

};


export default ReturnLink;
