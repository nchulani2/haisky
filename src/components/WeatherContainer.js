import React from 'react';
import '../styles/WeatherContainer.css';

export default class WeatherContainer extends React.Component {
  getDayState = hour => {
    return hour >= 6 && hour < 20 ? 'sun' : 'moon';
  };

  render() {
    const dayState = this.getDayState(this.props.hour);

    const { icon, id } = this.props.weatherInfo.weather[0];

    return (
      <div className="weatherContainer animated fadeIn delay-0s">
        <div className="ui container">
          <div className="ui segment fluid" id="outerEle">
            <div className="ui segment fluid" id="innerEle">
              <div id="flexEle">
                <div className="headerEle">Hai Sky</div>
                <div style={{ textAlign: 'center' }} className="timeEle">
                  {this.props.time}
                  <i className={`ui ${dayState} icon`} />
                </div>
                <img
                  className="animated pulse delay-0s infinite iconEle"
                  src={`https://openweathermap.org/img/w/${icon}.png`}
                  alt={id}
                />
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
