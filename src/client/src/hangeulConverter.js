import _ from 'lodash';
import hangeulToHiraganaMap from './hiraganaMaps/hangeulToHiraganaMap';

// the following characters are in the correct (i.e. Unicode) order
const TAIL_CHARS = "ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ"; // list of tail characters
const HANGEUL_UNICODE_START_VAL = 44032;
const HANGEUL_UNICODE_END_VAL = 55171;

function convertHangeulToHiragana(inputText) {
  let result = [];

  _.forEach(inputText, c => {
    if (isHangeul(c)) {
      let hiraganaAttempt = hangeulToHiraganaMap[c];

      if (!hiraganaAttempt) {
        const characters = separateTail(c);

        if (characters.tailString &&
          hangeulToHiraganaMap[characters.tailString] &&
          hangeulToHiraganaMap[characters.tailSeparated]) {
          hiraganaAttempt = hangeulToHiraganaMap[characters.tailSeparated] +
            hangeulToHiraganaMap[characters.tailString];
        }
      }

      result.push(hiraganaAttempt ? hiraganaAttempt : c);
    } else {
      const punctuationAttempt = convertPunctuation(c);
      result.push(punctuationAttempt ? punctuationAttempt : c);
    }
  });

  return result.join('');
}

function convertPunctuation(char) {
  switch(char) {
    case '-':
      return 'ー';
    case '.':
      return '。';
    case ',':
      return '、';
    default:
      return null;
  }
}

// https://stackoverflow.com/questions/40941528/get-last-character-of-korean-word-in-java
function separateTail(char) {
  const charValue = char.codePointAt(0); // Unicode value

  const tailIndex =
    ((charValue - HANGEUL_UNICODE_START_VAL) % (TAIL_CHARS.length + 1)) - 1;
  const tailString = 
    tailIndex === -1 ? '' : TAIL_CHARS.substring(tailIndex, tailIndex + 1);

  return {
    tailSeparated: String.fromCharCode(charValue - tailIndex - 1),
    tailString
  };
}

function isHangeul(char) {
  return _.inRange(char.codePointAt(0),
    HANGEUL_UNICODE_START_VAL,
    HANGEUL_UNICODE_END_VAL + 1);
}

export default {
  convertHangeulToHiragana
};