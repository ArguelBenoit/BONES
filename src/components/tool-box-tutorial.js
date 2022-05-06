import React from 'react';
import PropTypes from 'prop-types';
import i18 from 'Utils/i18.js';


const ToolBoxTutorial = ({ message, handlerChange, encrypt, decrypt }) => {
  return <div>

    <div className="step-title">
      <div className="step-title-nbr">1</div>
      <div className="step-title-txt">{i18('toolboxTitle1')}</div>
    </div>
    <textarea
      id="bones-input"
      placeholder={i18('toolboxSafeAreaPlaceholder')}
      className="u-margin-bottom-s"
      value={message}
      onChange={handlerChange}
      style={{ resize: 'none', height: 120 }}
    />

    <div className="step-title">
      <div className="step-title-nbr">2</div>
      <div className="step-title-txt">{i18('toolboxTitle2')}</div>
    </div>
    {/* prevent default pour conserver le focus dans le champ */}
    <button
      onMouseDown={e => e.preventDefault()}
      onClick={encrypt}
      className="general-button u-margin-bottom-s"
    >
      {i18('toolboxEncrypt')}
    </button>

    <div className="step-title">
      <div className="step-title-nbr">3</div>
      <div className="step-title-txt">{i18('toolboxTitle3')}</div>
    </div>
    <div className="u-margin-bottom-s">{i18('toolboxInstruction3')}</div>

    <div className="step-title">
      <div className="step-title-nbr">4</div>
      <div className="step-title-txt">{i18('toolboxTitle4')}</div>
    </div>
    <button
      onClick={decrypt}
      className="u-margin-bottom-s general-button --color-one"
    >
      {i18('toolboxDecrypt')}
    </button>

    <div className="step-title">
      <div className="step-title-nbr">5</div>
      <div className="step-title-txt">{i18('toolboxTitle5')}</div>
    </div>
    <div>{i18('toolboxInstruction5')}</div>

  </div>;
};


ToolBoxTutorial.propTypes = {
  message: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
  encrypt: PropTypes.func.isRequired,
  decrypt: PropTypes.func.isRequired
};


export default ToolBoxTutorial;
