import React from 'react';
import '../styles/Button.css';

export default class Button extends React.Component {
  onButtonClicked = e => {
    e.preventDefault();

    this.props.buttonClicked();
  };

  render() {
    return (
      <div className="button">
        <button
          ref={this.buttonRef}
          onClick={this.onButtonClicked}
          className="ui large button"
          id="buttonEle">
          Get my Location!
        </button>
      </div>
    );
  }
}
