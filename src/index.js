import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

class Index extends React.Component {
  option = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER
  };

  render() {
    return (
      <Provider template={AlertTemplate} {...this.option}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Index />, document.querySelector('#root'));
