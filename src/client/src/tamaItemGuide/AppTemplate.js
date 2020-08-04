import React from 'react';
import './App.css';

function AppTemplate() {
  return (
    <div className="wrapper">
      <h1>Tama Item Guide</h1>

      <p>Select Tamas</p>
      <form onSubmit={this.handleSubmit}>
        <div className="tama-list-wrapper">
          {this.state.tamas.map((tama, i) =>
            <div className={"tama-select" + (this.state[tama.displayName] ? ' selected' : '')}
              key={`tama-${i}`}
              onClick={e => this.handleTamaSelected(e, tama)}>
              <div className="tama-name">{tama.displayName}</div>
              <img src={tama.imgUrl} className="tama-image" />
            </div>
          )}
        </div>


        <button onClick={this.handleReset}>Reset</button>

        <input type="submit" value="Submit" />
      </form>

      <p>Result</p>
      {this.state.result.map((item, i) =>
        <div key={i}>{item}</div>
      )}
    </div>

      // <textarea type="text"
      //   maxLength="5000"
      //   placeholder="Type something"
      //   ref={this.textareaRef}
      //   onChange={this.handleInputChange}/>
      // <button className="clear-btn" onClick={this.handleClear}>Clear</button>
      // <div className="section">
      //   Hiragana:
      //   <div className="output">
      //     {this.state.clipboardEnabled &&
      //       <button className="copy-btn"
      //         disabled={this.state.hiraganaCopied}
      //         onClick={this.handleOnCopyHiragana}>
      //         {this.state.hiraganaCopied ? 'Copied!' : 'Copy'}
      //       </button>
      //     }
      //     {this.state.hiraganaOutput}
      //   </div>
      // </div>
      // <div className="section">
      //   Translation:
      //   <div className="output">
      //     {this.state.clipboardEnabled &&
      //       <button className="copy-btn"
      //         disabled={this.state.translationCopied}
      //         onClick={this.handleOnCopyTranslation}>
      //         {this.state.translationCopied ? 'Copied!' : 'Copy'}
      //       </button>
      //     }
      //     {this.state.translation}
      //   </div>
      // </div>
    // </div>
  );
}

export default AppTemplate;
