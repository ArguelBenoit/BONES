import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import bonesRegular from 'Images/bones/head-regular.png';
import bonesSuccess from 'Images/bones/head-success.png';
import arrow from 'Images/bones/arrow.png';
import 'Styles/toolbox.less';
import ToolBoxTutorial from 'Components/tool-box-tutorial.js';
import ToolBoxContent from 'Components/tool-box-content.js';
import Loading from 'Components/loading.js';
import i18 from 'Utils/i18.js';
import { Crypting } from 'Utils/domain/crypting.js';
// Storage
import { Storage } from 'Utils/storage/storage.js';
const friendStore = new Storage('friend');
const settingsStore = new Storage('settings');
const pairStore = new Storage('pair');


// bon ok... le 100% fonctionnel c'est plus esthetique, mais dans le cas de cette toolbox injecté dans les pages web, on passera.
class ToolBox extends React.Component {
  constructor(props) {
    super(props);

    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
    this.setToggled = this.setToggled.bind(this);
    this.setShowInstruction = this.setShowInstruction.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.simulateInput = this.simulateInput.bind(this);
    this.updateMainPostion = this.updateMainPostion.bind(this);

    this.state = {
      toggled: false,
      message: '',
      showInstruction: true,
      header: '',
      img: 'regular',
      stun: false,
      loaded: false,
      x: 60,
      y: 60
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

    let { y, x } = this.props.coordinate;
    if (x > window.innerWidth - 400) x = window.innerWidth - 400;
    if (x < 20) x = 20;
    if (y > window.innerHeight - 340) y = window.innerHeight - 340;
    if (y < 20) y = 20;

    (async () => {
      const settings = await settingsStore.getOne('settings');
      const friends = await friendStore.getList(settings.friends);
      const pair = await pairStore.getOne(settings.pair);
      this.crypting = new Crypting(friends, pair);
      this.setState({
        toggled: settings.open,
        showInstruction: settings.instruction,
        header: '',
        loaded: true,
        y,
        x
      });
      setTimeout(() => {
        this.updateMainPostion();
      }, 100);
    })();
  }


  updateMainPostion() {
    /* remplacer le querySelector par une ref */
    const position = document
      .querySelector('#bones-tool-box')
      .getBoundingClientRect();
    const { left, top } = position;
    settingsStore.modify('settings', {
      x: left,
      y: top
    });
  }


  setToggled() {
    const { toggled } = this.state;
    settingsStore.modify('settings', { open: !toggled });
    this.setState({ toggled: !toggled });
  }


  setShowInstruction() {
    settingsStore.modify('settings', {instruction: !this.state.showInstruction});
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
        const encryptedValue = this.crypting.encrypt(message);
        this.setState({ message: encryptedValue});
        setTimeout(() => {
          navigator
            .clipboard
            .writeText(encryptedValue)
            .then(() => {
              this.setState({ message: '', stun: false});
              this.success(i18('toolboxEncryptCopySuccess'));
            });
        }, 1200);

      // Chiffrement input non BONES
      } else if ((tagName === 'INPUT' || tagName === 'TEXTAREA') && value && value !== '') {
        if (value.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.crypting.encrypt(value);
          activeElement.value = encryptedValue;
          this.setState({stun: false});
          this.success(i18('toolboxEncryptSuccess'));
          this.simulateInput(activeElement);
        }
        this.setState({stun: false});

      // Chiffrement div contentEditable non BONES
      } else if ((tagName === 'DIV' && contentEditable) && textContent && textContent !== '') {
        if (textContent.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.crypting.encrypt(textContent);
          activeElement.textContent = encryptedValue;
          this.setState({stun: false});
          this.success(i18('toolboxEncryptSuccess'));
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
        header: '',
        img: 'regular'
      });
    }, 3000);
  }


  loading(activated) {
    if (activated) {
      this.setState({
        header: i18('toolboxLoading'),
        img: 'loading'
      });
    } else {
      this.setState({
        header: '',
        img: 'regular'
      });
    }
  }


  decrypt() {
    const { stun } = this.state;
    if (!stun) {
      this.setState({ stun: true });
      this.loading(true);
      setTimeout(() => {
        this.crypting.parse().then(() => {
          this.loading(false);
          this.setState({ stun: false });
          this.success(i18('toolboxDecryptSuccess'));
        });
      }, 50);
    }
  }


  // lance differents events sur un élément pour simuler une action utilisateur
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
    const { message, toggled, img, header, showInstruction, loaded, x, y } = this.state;

    const propsContent = {
      message,
      handlerChange: this.handlerChange,
      encrypt: this.encrypt,
      decrypt: this.decrypt
    };

    if (loaded) {
      return <Draggable
        defaultPosition={{ x, y }}
        handle=".draggable-handler"
        onStop={this.updateMainPostion}
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
                  ? <Loading size={60}/>
                  : ''
                }
              </div>
              <div className="u-flex">
                <div className="label-toolbox">
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
                  checked={showInstruction}
                  onChange={this.setShowInstruction}
                />
                <div>{i18('toolboxInstruction')}</div>
              </div>
            </div>

          </div>
          <div className="content-shadow-two"/>
        </div>
      </Draggable>;
    } else {
      return '';
    }
  }
}


ToolBox.propTypes = {
  coordinate: PropTypes.object.isRequired
};


export default ToolBox;
