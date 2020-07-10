import React from 'react';
import _ from 'lodash';
import hangeulConverter from './hangeulConverter';
import AppTemplate from './AppTemplate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboardEnabled: !!navigator.clipboard,
      hiraganaCopied: false,
      translationCopied: false,
      hiraganaOutput: '',
      translation: '',
      prevHiragana: '',
    };

    // Event handlers
    this.handleClear = this.handleClear.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnCopyHiragana = this.handleOnCopyHiragana.bind(this);
    this.handleOnCopyTranslation = this.handleOnCopyTranslation.bind(this);

    // DOM Refs
    this.textareaRef = React.createRef();
  }

  handleInputChange(e) {
    e.persist();
    if (!e.target.value) {
      this._resetState();
      return;
    }

    if (!this.debouncedFetchTranslation) {
      this.debouncedFetchTranslation = _.debounce(() => {
        const hiragana = hangeulConverter.convertHangeulToHiragana(e.target.value);

        if (hiragana === this.state.prevHiragana) {
          return;
        }

        this.setState({
          hiraganaCopied: false,
          translationCopied: false,
          hiraganaOutput: hiragana,
          prevHiragana: hiragana
        });

        this._fetchTranslation(hiragana)
          .then(data => {
            this.setState({
              translation: data.message.result.translatedText
            });
          });
      }, 500);
    }

    this.debouncedFetchTranslation();
  }

  handleClear() {
    this._resetState();
    this.textareaRef.current.value = '';
  }

  handleOnCopyHiragana() {
    navigator.clipboard.writeText(this.state.hiraganaOutput)
      .then(() => {
        this.setState({
          hiraganaCopied: true,
          translationCopied: false
        });
      });
  }

  handleOnCopyTranslation() {
    navigator.clipboard.writeText(this.state.translation)
      .then(() => {
        this.setState({
          hiraganaCopied: false,
          translationCopied: true
        });
      });
  }

  render() {
    return AppTemplate.call(this);
  }

  _resetState() {
    this.setState({
      hiraganaCopied: false,
      translationCopied: false,
      hiraganaOutput: '',
      prevHiragana: '',
      translation: '',
    });
  }

  _fetchTranslation(hiragana) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'query': hiragana
      }),
    };

    return fetch("/translate", requestOptions)
      .then(response => response.json());
  }
}

export default App;