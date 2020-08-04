import React from 'react';
import _ from 'lodash';
import AppTemplate from './AppTemplate';
import {getItemsForTamas} from './getItemsForTamas';
import TAMA_LIST from './tamaList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tamas: TAMA_LIST,
      result: []
      // selectedTamas: {},
      // clipboardEnabled: !!navigator.clipboard,
      // hiraganaCopied: false,
      // translationCopied: false,
      // hiraganaOutput: '',
      // translation: '',
      // prevHiragana: '',
    };

    // Event handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTamaSelected = this.handleTamaSelected.bind(this);
    this.handleReset = this.handleReset.bind(this);
    // this.handleClear = this.handleClear.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleOnCopyHiragana = this.handleOnCopyHiragana.bind(this);
    // this.handleOnCopyTranslation = this.handleOnCopyTranslation.bind(this);

    // DOM Refs
    // this.textareaRef = React.createRef();
  }

  handleReset(event) {
    event.preventDefault();
    const stateObject = {};
    this.state.tamas.forEach(tama => stateObject[tama.displayName] = false);
    stateObject.result = [];
    stateObject.tamas = this.state.tamas;
    this.setState(stateObject);
  }

  handleSubmit(event) {
    console.log("Submit!");
    console.log(this.state);
    event.preventDefault();

    this.setState({
      result: getItemsForTamas(this.state.tamas.filter(tama => this.state[tama.displayName]))
    });
  }

  handleTamaSelected(event, tama) {
    event.preventDefault();
    const tamaName = tama.displayName;
    const currentState = !!this.state[tamaName];
    const newState = !currentState;
    this.setState({
      [tamaName]: newState
    });
  }

  render() {
    return AppTemplate.call(this);
  }

  // _resetState() {
  //   this.setState({
  //     hiraganaCopied: false,
  //     translationCopied: false,
  //     hiraganaOutput: '',
  //     prevHiragana: '',
  //     translation: '',
  //   });
  // }
  //
  // _fetchTranslation(hiragana) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       'query': hiragana
  //     }),
  //   };
  //
  //   return fetch("/translate", requestOptions)
  //     .then(response => response.json());
  // }
}

export default App;
