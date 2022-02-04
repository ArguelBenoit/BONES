import React, { useState } from 'react';
import 'Styles/toolbox.less';
import bones from 'Images/bones/head-regular.png';
import arrow from 'Images/bones/arrow.png';
import line from 'Images/bones/line.png';
import PropTypes from 'prop-types';
import 'Styles/toolbox.less';


const ToolBox = ({ method, updateMethod }) => {

  const [ state, setState ] = useState({
    toggled: method.open ? method.open : false
  });

  const setToggled = () => {
    updateMethod('open', !state.toggled);
    setState({ ...state, toggled: !state.toggled });
  };

  const { toggled } = state;

  return <div id="bones-tool-box" className={toggled ? ' toggled' : ''}>
    <div className="content-shadow-one">

      <div
        className="bones-header"
      >
        <div className="bones-logo-header">
          <img src={bones} width="60" height="60"/>
        </div>
        <div className="u-flex">
          <div className="label-method">
            <div className="text">
              {method.label}
            </div>
          </div>
          <img
            className="toggle-header"
            id="toggle-header"
            src={arrow}
            width="34"
            onClick={setToggled}
          />
        </div>
      </div>


      <div className="u-padding u-padding-top-s content">

        <div className="step-title">
          <div className="step-title-nbr">1</div>
          <div className="step-title-txt">Write your text here</div>
        </div>
        <textarea
          id="bones-input"
          placeholder="Encryption area"
          className="u-margin-bottom-s"
        />

        <div className="step-title">
          <div className="step-title-nbr">2</div>
          <div className="step-title-txt">Encrypt and cut it with this button</div>
        </div>
        <button
          className="general-button u-margin-bottom-s"
        >
          Encrypt ctr+j
        </button>

        <div className="step-title">
          <div className="step-title-nbr">3</div>
          <div className="step-title-txt">Final step</div>
        </div>
        <div>Your encrypted text is in your clipboard, you just have to paste it in the field of the website and send it</div>

        <div className="u-flex u-margin-top-m u-margin-bottom-m">
          <img src={line} width="80" />
        </div>

        <button
          className="u-margin-bottom-m general-button --color-one"
        >
          Decrypt ctr+k
        </button>

        <div>
          You can also try to <b>write and encrypt directly in the field of the website</b> but this causes failures on many modern platforms, if you encounter a problem as a result of your try in this way, reload the page and use the field of this toolbox
        </div>


      </div>
    </div>
    <div className="content-shadow-two"/>
  </div>;

};



ToolBox.propTypes = {
  method: PropTypes.object.isRequired,
  updateMethod: PropTypes.func.isRequired
};


export default ToolBox;
