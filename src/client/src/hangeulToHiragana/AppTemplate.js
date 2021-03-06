import React from 'react';
import './App.css';

function AppTemplate() {
  return (
    <div className="wrapper">
      <h1>Hangeul to Hiragana Converter</h1>
      <textarea type="text"
        maxLength="5000"
        placeholder="오마에와 모 신데이루"
        ref={this.textareaRef}
        onChange={this.handleInputChange}/>
      <button className="clear-btn" onClick={this.handleClear}>Clear</button>
      <div className="section">
        Hiragana:
        <div className="output">
          {this.state.clipboardEnabled &&
            <button className="copy-btn"
              disabled={this.state.hiraganaCopied}
              onClick={this.handleOnCopyHiragana}>
              {this.state.hiraganaCopied ? 'Copied!' : 'Copy'}
            </button>
          }
          {this.state.hiraganaOutput}
        </div>
      </div>
      <div className="section">
        Translation:
        <div className="output">
          {this.state.clipboardEnabled &&
            <button className="copy-btn"
              disabled={this.state.translationCopied}
              onClick={this.handleOnCopyTranslation}>
              {this.state.translationCopied ? 'Copied!' : 'Copy'}
            </button>
          }
          {this.state.translation}
        </div>
      </div>
    </div>
  );
}

export default AppTemplate;
