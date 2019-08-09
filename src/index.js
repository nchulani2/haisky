import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

class Index extends React.Component {
  render() {
    return <App />;
  }
}
setTimeout(() => {
  ReactDOM.render(<Index />, document.querySelector('#root'));
}, 2400);
