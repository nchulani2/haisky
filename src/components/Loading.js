import React from 'react';
import SvgLoader from './SvgLoader';
import '../styles/Loading.css';

export default class Loading extends React.Component {
  render() {
    if (this.props.lat) {
      return (
        <div className="loading">
          <SvgLoader />
        </div>
      );
    }
    return (
      <div className="loading animated fadeIn delay-0s">
        <div
          className="ui very padded segment"
          id="containerEle"
          style={{ transform: `translate(-50%,${this.props.translateYby})` }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

// You can set default props as an object to a component in the case you forgot to pass a prop to a reusable component
// IT TAKES THE LAST KEY VALUE IN THE OBJECT
// only useful if we're passing data via props
// Loading.defaultProps = {
//   loadingMessage: 'Loading. . .'
// };
