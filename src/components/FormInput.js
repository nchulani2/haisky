import React from 'react';
import Geosuggest from 'react-geosuggest';
import '../styles/FormInput.css';

export default class FormInput extends React.Component {
  state = {
    inputVal: ''
  };

  onInputChanged = value => {
    this.setState({ inputVal: value });
  };

  onSuggestSelect = value => {
    if (value === undefined) {
      this.setState({ inputVal: '' });
    } else if (value) {
      if (this.props.onLoadSubmit) {
        this.setState({ inputVal: value.label });
        this.props.onLoadSubmit(this.state.inputVal);
        this.setState({ inputVal: '' });
      } else if (this.props.onFormSubmit) {
        this.setState({ inputVal: value.label });
        this.props.onFormSubmit(this.state.inputVal);
        this.setState({ inputVal: '' });
      }
    }
  };

  render() {
    return (
      <div className="formInput">
        <div className="containerForm">
          <Geosuggest
            onSuggestSelect={this.onSuggestSelect}
            onChange={this.onInputChanged}
            placeholder="Search for a place. . ."
            initialValue={this.state.inputVal}
          />
        </div>
      </div>
    );
  }
}
