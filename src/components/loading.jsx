import loadingImg from 'Images/bones/loading.png';
import 'Styles/loading.less';
import PropTypes from 'prop-types';


const Loading = ({ size }) => {

  return <div
    className="mask-loading"
    style={{
      width: size,
      height: size
    }}
  >
    <img
      className="loading"
      style={{margin: 'auto'}}
      src={loadingImg}
      width={size*6}
      height={size}
      draggable="false"
    />
  </div>;

};



Loading.propTypes = {
  size: PropTypes.number.isRequired
};


export default Loading;
