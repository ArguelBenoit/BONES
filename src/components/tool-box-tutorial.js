import React from 'react';
import PropTypes from 'prop-types';


const ToolBoxTutorial = ({ message, handlerChange, encrypt, decrypt }) => {
  return <div>

    <div className="step-title">
      <div className="step-title-nbr">1</div>
      <div className="step-title-txt">Write your message in the encryption area</div>
    </div>
    <textarea
      id="bones-input"
      placeholder="Encryption area"
      className="u-margin-bottom-s"
      value={message}
      onChange={handlerChange}
      style={{ resize: 'none', height: 120 }}
    />

    <div className="step-title">
      <div className="step-title-nbr">2</div>
      <div className="step-title-txt">Encrypt and cut it with this button</div>
    </div>
    {/* prevent default pour conserver le focus dans le champ */}
    <button
      onMouseDown={e => e.preventDefault()}
      onClick={encrypt}
      className="general-button u-margin-bottom-s"
    >
      Encrypt ctr+j
    </button>

    <div className="step-title">
      <div className="step-title-nbr">3</div>
      <div className="step-title-txt">Send your encrypted message</div>
    </div>
    <div className="u-margin-bottom-s">Your encrypted text is in your clipboard, you just have to paste it in the field of the website and send it</div>

    <div className="step-title">
      <div className="step-title-nbr">4</div>
      <div className="step-title-txt">Decrypt messages on the page</div>
    </div>
    <button
      onClick={decrypt}
      className="u-margin-bottom-s general-button --color-one"
    >
      Decrypt ctr+k
    </button>

    <div className="step-title">
      <div className="step-title-nbr">5</div>
      <div className="step-title-txt">Information</div>
    </div>
    <div>
      You can also try to <b>write and encrypt directly in the field of the website</b> but this causes failures on many modern platforms, if you encounter a problem as a result of your try in this way, reload the page and use the field of this toolbox
    </div>

  </div>;
};


ToolBoxTutorial.propTypes = {
  message: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
  encrypt: PropTypes.func.isRequired,
  decrypt: PropTypes.func.isRequired
};


export default ToolBoxTutorial;
