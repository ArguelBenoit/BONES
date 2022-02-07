import React from 'react';
import PropTypes from 'prop-types';


const ToolBoxContent = ({ message, handlerChange, encrypt, decrypt }) => {

  return <div>
    <textarea
      id="bones-input"
      placeholder="Encryption area"
      className="u-margin-bottom-s"
      value={message}
      onChange={handlerChange}
      style={{ resize: 'none', height: 150 }}
    />
    <div className="u-flex">
      <div className="u-half-width" style={{ paddingRight: 7.5 }}>
        {/* prevent default pour conserver le focus dans le champ */}
        <button
          onClick={encrypt}
          className="general-button u-full-width"
          onMouseDown={e => e.preventDefault()}
        >
          Encrypt ctr+j
        </button>
      </div>
      <div className="u-half-width" style={{ paddingLeft: 7.5 }}>
        <button
          onClick={decrypt}
          className="general-button u-full-width --color-one"
          id="decrypt-message"
        >
          Decrypt ctr+k
        </button>
      </div>
    </div>
  </div>;

};


ToolBoxContent.propTypes = {
  message: PropTypes.string.isRequired,
  handlerChange: PropTypes.func.isRequired,
  encrypt: PropTypes.func.isRequired,
  decrypt: PropTypes.func.isRequired
};


export default ToolBoxContent;
