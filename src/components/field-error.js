import React from 'react';
import PropTypes from 'prop-types';


const FieldError = ({ status }) => {

  const statusResponse = {
    0: '',
    1: <span className="form-error">This field is required</span>,
    2: <span className="form-error">This is not a RSA public key</span>,
    3: <span className="form-error">This is not a RSA private key</span>
  };

  return statusResponse[status];
};


FieldError.propTypes = {
  status: PropTypes.number.isRequired // 0 = OK, 1 = vide, 2 | 3 = rsa non valid
};


export default FieldError;
