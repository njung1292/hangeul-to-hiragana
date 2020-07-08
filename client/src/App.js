import React from 'react';
import _ from 'lodash';
import './App.css';
import hangeulToHiraganaMap from './hiraganaMaps/hangeulToHiraganaMap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiraganaOutput: '',
      translation: '',
      prevHiragana: '',
    };
  }

  handleKeyUp(e) {
    e.persist();

    if (!this.debouncedHandleKeyUp) {
      this.debouncedHandleKeyUp = _.debounce(() => {
        if (!e.target.value) {
          this.setState(prevState => ({
            hiraganaOutput: '',
            translation: '',
            prevHiragana: prevState.hiraganaOutput,
          }));
          return;
        }

        let hiragana = convertHangeulToHiragana(e.target.value);
        if (hiragana === this.state.prevHiragana) {
          return;
        }

        this.setState(prevState => ({
          hiraganaOutput: hiragana,
          translation: prevState.translation,
          prevHiragana: prevState.hiraganaOutput
        }));

        fetchTranslation(hiragana)
          .then(data => {
            this.setState(prevState => ({
              hiraganaOutput: hiragana,
              translation: data.message.result.translatedText,
              prevHiragana: hiragana,
            }));
          });
      }, 400);
    }

    this.debouncedHandleKeyUp();
  }

  render() {
    return ( <
      div className = "wrapper" >
      <
      input type = "text"
      onKeyUp = {
        (e) => this.handleKeyUp(e)
      }
      /> <
      div className = "hiraganaOutput" > 히라가나: {
        this.state.hiraganaOutput
      } < /div> <
      div className = "translation" > 한국어: {
        this.state.translation
      } < /div> <
      /div>
    );
  }
}

function convertHangeulToHiragana(hangeul) {
  let result = '';

  _.forEach(hangeul, c => {
    let hiraganaAttempt = hangeulToHiraganaMap[c];

    if (!hiraganaAttempt) {
      const characters = separateHangeul(c);
      if (characters.tailString && hangeulToHiraganaMap[characters.tailString] &&
        hangeulToHiraganaMap[characters.tailSeparated]) {
        hiraganaAttempt = hangeulToHiraganaMap[characters.tailSeparated] + hangeulToHiraganaMap[characters.tailString];
      }
    }

    result += hiraganaAttempt ? hiraganaAttempt : c;
  });

  return result;
}

// the following characters are in the correct (i.e. Unicode) order
const initials = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // list of initials
const vowels = "ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ"; // list of vowels
const finals = "ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ"; // list of tail characters
const hangulUnicodeStartValue = 44032;

// https://stackoverflow.com/questions/40941528/get-last-character-of-korean-word-in-java
function separateHangeul(character) {
  const characterValue = character.codePointAt(0); // Unicode value
  if (characterValue < hangulUnicodeStartValue) {
    return character; // for instance for 32 (space)
  }

  const tailIndex = _.round((characterValue - hangulUnicodeStartValue) % 28) - 1;
  const vowelIndex = _.round(((characterValue - hangulUnicodeStartValue - tailIndex) % 588) / 28);
  const initialIndex = (characterValue - hangulUnicodeStartValue) / 588;
  const leadString = initials.substring(initialIndex, initialIndex + 1);
  const vowelString = vowels.substring(vowelIndex, vowelIndex + 1);
  const tailString = tailIndex === -1 ? "" : finals.substring(tailIndex, tailIndex + 1); // may be -1 when there is no tail character
  return {
    tailSeparated: String.fromCharCode(characterValue - tailIndex - 1),
    leadString,
    vowelString,
    tailString
  };
}

function fetchTranslation(hiragana) {
  console.warn(`requesting: ${hiragana}`);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'query': hiragana
    }),
  };

  return fetch("http://localhost:9000/translate", requestOptions)
    .then(response => response.json());
}

export default App;