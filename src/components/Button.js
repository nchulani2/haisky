import React from 'react';
import '../styles/Button.css';

export default class Button extends React.Component {
  state = {
    buttonText: 'Click here to access Location services'
  };

  onButtonClicked = e => {
    e.preventDefault();
    this.setState({
      buttonText: 'Please click allow'
    });

    this.props.buttonClicked();
  };

  render() {
    return (
      <div className="button">
        <button
          ref={this.buttonRef}
          onClick={this.onButtonClicked}
          className="ui large button"
          id="Ele">
          {this.state.buttonText}
        </button>
      </div>
    );
  }
}
