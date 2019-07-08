import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const loaderEle = document.querySelector('.preloader');
class Index extends React.Component {
  option = {
    timeout: 3000,
    position: positions.BOTTOM_CENTER
  };

  showLoader = () => {
    loaderEle.classList.remove('preloader--hide');
  };

  hideLoader = () => {
    loaderEle.classList.add('preloader--hide');
  };
  componentDidMount = () => {
    this.hideLoader();
  };

  render() {
    return (
      <Provider template={AlertTemplate} {...this.option}>
        <App />
      </Provider>
    );
  }
}
setTimeout(() => {
  ReactDOM.render(<Index />, document.querySelector('#root'));
}, 1500);
