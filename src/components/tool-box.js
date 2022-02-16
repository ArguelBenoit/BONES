import React from 'react';
import Draggable from 'react-draggable';
import bonesRegular from 'Images/bones/head-regular.png';
import bonesSuccess from 'Images/bones/head-success.png';
import bonesLoading from 'Images/bones/loading.gif';
import arrow from 'Images/bones/arrow.png';
import 'Styles/toolbox.less';
import ToolBoxTutorial from 'Components/tool-box-tutorial.js';
import ToolBoxContent from 'Components/tool-box-content.js';
import { Crypting } from 'Utils/crypting.js';
import { tools } from 'Utils/tools.js';
const { getStupidActive } = tools;
// Storage
import { Storage } from 'Utils/storage.js';
const methodStore = new Storage('method');
const friendStore = new Storage('friend');
const pairStore = new Storage('pair');




class ToolBox extends React.Component {
  constructor(props) {
    super(props);

    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
    this.setToggled = this.setToggled.bind(this);
    this.setShowInstruction = this.setShowInstruction.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.simulateInput = this.simulateInput.bind(this);

    this.state = {
      toggled: false,
      message: '',
      showInstruction: true,
      header: '',
      img: 'regular',
      stun: false,
      stupid: false,
      loaded: false,
      uuidMethod: '',
      labelMethod: ''
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

    (async () => {
      const settings = await methodStore.getOne('settings');
      const stupid = getStupidActive(settings);

      if (stupid === true) {
        const friends = await friendStore.getList(settings.friends);
        const pair = await pairStore.getOne(settings.pair);
        this.crypting = new Crypting(friends, pair);
        this.setState({
          toggled: settings.open,
          showInstruction: settings.instruction,
          header: 'Stupid mode',
          labelMethod: 'Stupid mode',
          stupid: true,
          loaded: true
        });
      } else {

        const method = await methodStore.keyValue('url', window.location.href);
        const pair = await pairStore.getOne(method[0].pair);
        const friends = await friendStore.getList(method[0].friends);
        this.crypting = new Crypting(friends, pair);
        this.setState({
          toggled: method[0].open,
          uuidMethod: method[0].uuid,
          labelMethod: method[0].label,
          header: method[0].label,
          showInstruction: settings.instruction,
          stupid: false,
          loaded: true
        });
      }

    })();
  }


  setToggled() {
    const { stupid, uuidMethod, toggled } = this.state;
    methodStore.modify(stupid ? 'settings' : uuidMethod, { open: !toggled });
    this.setState({ toggled: !toggled });
  }


  setShowInstruction() {
    methodStore.modify('settings', {instruction: !this.state.showInstruction});
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
              this.success(<span>Message copied to your clipboard,<br/>Paste it into the main chat field</span>);
            });
        }, 1200);

      // Chiffrement input non BONES
      } else if ((tagName === 'INPUT' || tagName === 'TEXTAREA') && value && value !== '') {
        if (value.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.crypting.encrypt(value);
          activeElement.value = encryptedValue;
          this.setState({stun: false});
          this.success(<span>Your message is crypted</span>);
          this.simulateInput(activeElement);
        }
        this.setState({stun: false});

      // Chiffrement div contentEditable non BONES
      } else if ((tagName === 'DIV' && contentEditable) && textContent && textContent !== '') {
        if (textContent.indexOf('~ BONES ENCRYPTED MESSAGE') === -1) {
          const encryptedValue = this.crypting.encrypt(textContent);
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
    const { labelMethod } = this.state;
    this.setState({
      header: message,
      img: 'success'
    });
    setTimeout(() => {
      this.setState({
        header: labelMethod,
        img: 'regular'
      });
    }, 3000);
  }


  loading(activated) {
    const { labelMethod } = this.state;
    if (activated) {
      this.setState({
        header: 'BONES is working',
        img: 'loading'
      });
    } else {
      this.setState({
        header: labelMethod,
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
          this.success(<span>Decryption of page messages<br/>is complete</span>);
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

    const { message, toggled, img, header, showInstruction, loaded } = this.state;

    const propsContent = {
      message,
      handlerChange: this.handlerChange,
      encrypt: this.encrypt,
      decrypt: this.decrypt
    };

    if (loaded) {
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
    } else {
      return '';
    }
  }
}


export default ToolBox;
