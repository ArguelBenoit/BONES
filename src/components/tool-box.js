import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import bonesRegular from 'Images/bones/head-regular.png';
import bonesSuccess from 'Images/bones/head-success.png';
import bonesLoading from 'Images/bones/loading.gif';
import arrow from 'Images/bones/arrow.png';
import 'Styles/toolbox.less';
import ToolBoxTutorial from 'Components/tool-box-tutorial.js';
import ToolBoxContent from 'Components/tool-box-content.js';



// const ToolBox = ({ method, updateMethod, instruction, crypting }) => {
class ToolBox extends React.Component {
  constructor(props) {
    super(props);

    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
    this.setToggled = this.setToggled.bind(this);
    this.setShowInstruction = this.setShowInstruction.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.simulateInput = this.simulateInput.bind(this);

    const { method, instruction } = props;
    this.state = {
      toggled: method.open ? method.open : false,
      message: '',
      showInstruction: instruction,
      header: method.label,
      img: 'regular',
      stun: false
    };
  }


  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey) {
        if (e.key === 'j') {
          e.preventDefault();
          this.encrypt();
        } else if (e.key === 'k') {
          e.preventDefault();
          this.decrypt();
        }
      }
    });
  }


  setToggled() {
    this.props.updateMethod('open', !this.state.toggled);
    this.setState({ toggled: !this.state.toggled });
  }


  setShowInstruction() {
    browser.storage.local.set({instruction: !this.state.showInstruction});
    this.setState({showInstruction: !this.state.showInstruction});
  }


  handlerChange(event) {
    const { value } = event.target;
    this.setState({ message: value });
  }


  encrypt() {
    const { stun, message } = this.state;
    if (stun === false) {
      this.setState({ stun: true });

      const { activeElement } = document;
      const { tagName, value, textContent, contentEditable } = activeElement;

      // Chiffrement du message de la zone d'encryption de BONES
      if (message && message !== '') {
        const encryptedValue = this.props.crypting.encrypt(message);
        this.setState({ message: encryptedValue});
        setTimeout(() => {
          navigator
            .clipboard
            .writeText(encryptedValue)
            .then(() => {
              this.setState({ message: '', stun: false});
              this.success(<span>Message copied to your clipboard,<br/>Paste it into the main chat field</span>);
            });
        }, 1200);

      // Chiffrement input non BONES
      } else if ((tagName === 'INPUT' || tagName === 'TEXTAREA') && value && value !== '') {
        if (value.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.props.crypting.encrypt(value);
          activeElement.value = encryptedValue;
          this.setState({stun: false});
          this.success(<span>Your message is crypted</span>);
          this.simulateInput(activeElement);
        }
        this.setState({stun: false});

      // Chiffrement div contentEditable non BONES
      } else if ((tagName === 'DIV' && contentEditable) && textContent && textContent !== '') {
        if (textContent.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.props.crypting.encrypt(textContent);
          activeElement.textContent = encryptedValue;
          this.setState({ stun: false});
          this.success(<span>Your message is crypted</span>);
          this.simulateInput(activeElement);
        }
        this.setState({ stun: false});
      }
    }
  }


  success(message) {
    this.setState({
      header: message,
      img: 'success'
    });
    setTimeout(() => {
      this.setState({
        header: this.props.method.label,
        img: 'regular'
      });
    }, 3000);
  }


  loading(activated) {
    if (activated) {
      this.setState({
        img: 'loading',
        header: 'BONES is working'
      });
    } else {
      this.setState({
        img: 'regular',
        header: this.props.method.label
      });
    }
  }


  decrypt() {
    const { stun } = this.state;
    if (!stun) {
      this.setState({ stun: true });
      this.loading(true);
      setTimeout(() => {
        this.props.crypting.parse().then(() => {
          this.loading(false);
          this.setState({ stun: false });
          this.success(<span>Decryption of page messages<br/>is complete</span>);
        });
      }, 50);
    }
  }


  // lance differents events su un élément pour simuler une action utilisateur
  simulateInput(inputElement) {
    const inputEvent = new InputEvent('input', {
      'bubbles': true,
      'cancelable': false
    });
    var changeEvent = new Event('change', {
      'bubbles': true,
      'cancelable': false
    });
    inputElement.dispatchEvent(inputEvent);
    inputElement.dispatchEvent(changeEvent);
  }


  render() {

    const { message, toggled, img, header, showInstruction } = this.state;

    const propsContent = {
      message,
      handlerChange: this.handlerChange,
      encrypt: this.encrypt,
      decrypt: this.decrypt
    };

    return <Draggable
      defaultPosition={{ x: 60, y: 60 }}
      handle=".draggable-handler"
    >
      <div
        id="bones-tool-box"
        className={toggled ? ' toggled' : ''}
      >
        <div className="content-shadow-one">

          <div className="bones-header draggable-handler" onMouseDown={e => e.preventDefault()}>
            <div className="bones-logo-header">
              {img === 'regular'
                ? <img draggable="false" src={bonesRegular} width="60" height="60" />
                : ''
              }
              {img === 'success'
                ? <img draggable="false" src={bonesSuccess} width="60" height="42" style={{marginTop: 5}} />
                : ''
              }
              {img === 'loading'
                ? <img draggable="false" src={bonesLoading} width="60" height="60" />
                : ''
              }
            </div>
            <div className="u-flex">
              <div className="label-method">
                <div className="text">
                  {header}
                </div>
              </div>
              <img
                className="toggle-header"
                id="toggle-header"
                src={arrow}
                width="34"
                draggable="false"
                onClick={this.setToggled}
              />
            </div>
          </div>

          <div className="u-padding u-padding-top-s content">
            {!showInstruction
              ? <ToolBoxContent {...propsContent} />
              : <ToolBoxTutorial {...propsContent} />
            }
            <div className="u-margin-top-s u-flex --left">
              <input
                type="checkbox"
                className="cm-toggle u-margin-right-s"
                id="show-bones-instruction"
                name="scales"
                checked={showInstruction}
                onChange={this.setShowInstruction}
              />
              <div>Show instructions</div>
            </div>
          </div>

        </div>
        <div className="content-shadow-two"/>
      </div>
    </Draggable>;
  }
}



ToolBox.propTypes = {
  method: PropTypes.object.isRequired,
  instruction: PropTypes.bool.isRequired,
  updateMethod: PropTypes.func.isRequired,
  crypting: PropTypes.object.isRequired
};


export default ToolBox;
