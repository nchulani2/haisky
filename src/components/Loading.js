import React from 'react';

import '../styles/Loading.css';

export default class Loading extends React.Component {
  renderContent = () => {
    if (this.props.lat) {
      return (
        <div className="loading">
          <div className="ui container very padded segment" id="containerEle">
            <div className="loadingScreen">
              <h3 className="headerEle">Loading. . .</h3>
              <div className="iconEle">
                <i className="huge cog loading icon" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="loading">
        <div className="ui container very padded segment" id="containerEle">
          <div className="loadingScreen">
            <h2 className="headerEleInit">Hai Sky</h2> {this.props.children}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// You can set default props as an object to a component in the case you forgot to pass a prop to a reusable component
// IT TAKES THE LAST KEY VALUE IN THE OBJECT
// only useful if we're passing data via props
// Loading.defaultProps = {
//   loadingMessage: 'Loading. . .'
// };
