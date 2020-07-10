import React from 'react';
import './App.css';

function AppTemplate() {
  return (
    <div className="wrapper">
      <textarea type="text" 
        maxLength="5000"
        placeholder="Type something"
        ref={this.textareaRef}
        onChange={this.handleInputChange}/>
      <button className="clear-btn" onClick={this.handleClear}>Clear</button>
      <input type="checkbox" 
        name="debugMode"
        className="debug-mode-checkbox" 
        value={this.state.debugMode} 
        onChange={this.handleDebugMode}/>
      <label htmlFor="debugMode">Debug mode</label>
      <div className="section">
        Hiragana:
        <div className="output">
          <button className="copy-btn"
            disabled={this.state.hiraganaCopied}
            onClick={this.handleOnCopyHiragana}>
            {this.state.hiraganaCopied ? 'Copied!' : 'Copy'}
          </button>
          {this.state.hiraganaOutput}
        </div>
      </div>
      <div className="section">
        Translation:
        <div className="output">
          <button className="copy-btn"
            disabled={this.state.translationCopied}
            onClick={this.handleOnCopyTranslation}>
            {this.state.translationCopied ? 'Copied!' : 'Copy'}
          </button>
          {this.state.translation}
        </div>
      </div>
    </div>
  );
}

export default AppTemplate;