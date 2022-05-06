import React from 'react';
import PropTypes from 'prop-types';
import i18 from 'Utils/i18.js';


const FieldError = ({ status }) => {

  const statusResponse = {
    0: '',
    1: <span className="form-error">{i18('fieldRequired')}</span>,
    2: <span className="form-error">{i18('fieldNoPublic')}</span>,
    3: <span className="form-error">{i18('fieldNoPrivate')}</span>
  };

  return statusResponse[status];
};


FieldError.propTypes = {
  status: PropTypes.number.isRequired // 0 = OK, 1 = vide, 2 | 3 = rsa non valid
};


export default FieldError;
