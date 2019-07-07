import React from 'react';
import moment from 'moment';
import '../styles/WeatherContent.css';

import Alert from './Alert';

export default class WeatherContent extends React.Component {
  constructor(props) {
    super(props);

    this.buttonCRef = React.createRef();
    this.buttonFRef = React.createRef();
  }
  state = {
    isCels: true,
    buttColorAct: '',
    buttColorNot: '',
    curr: '',
    min: '',
    max: '',
    city: '',
    country: '',
    desc: '',
    humid: '',
    rise: '',
    sunset: ''
  };

  convertToF = () => {
    // console.log(this.buttonFRef);
    // this.buttonFRef.current.className = 'selectedButt';
    // this.buttonCRef.current.className = 'tempButton';
    if (this.state.isCels) {
      this.setState({
        curr: (this.state.curr * 1.8 + 32).toFixed(2),
        min: (this.state.min * 1.8 + 32).toFixed(2),
        max: (this.state.max * 1.8 + 32).toFixed(2),
        buttColorAct: 'darkslategrey',
        buttColorNot: 'transparent',
        isCels: false
      });
    }
  };

  convertToC = () => {
    // console.log(this.buttonFRef);
    // this.buttonCRef.current.className = 'selectedButt';
    // this.buttonFRef.current.className = 'tempButton';
    if (!this.state.isCels) {
      this.setState({
        curr: (((this.state.curr - 32) * 5) / 9).toFixed(2),
        min: (((this.state.min - 32) * 5) / 9).toFixed(2),
        max: (((this.state.max - 32) * 5) / 9).toFixed(2),
        buttColorNot: 'darkslategrey',
        buttColorAct: 'transparent',

        isCels: true
      });
    }
  };

  componentDidMount = () => {
    const { name } = this.props.weatherInfo;
    const { country, sunrise, sunset } = this.props.weatherInfo.sys;
    const { description } = this.props.weatherInfo.weather[0];
    const { humidity, temp, temp_max, temp_min } = this.props.weatherInfo.main;
    const basicKelv = 273.15;
    this.setState({
      isCels: true,
      buttColorAct: 'transparent',
      buttColorNot: 'darkslategrey',
      curr: (temp - basicKelv).toFixed(2),
      max: (temp_max - basicKelv).toFixed(2),
      min: (temp_min - basicKelv).toFixed(2),
      city: name,
      country: country,
      desc: description,
      humid: humidity,
      rise: moment(sunrise * 1000).format('LTS'),
      sunset: moment(sunset * 1000).format('LTS')
    });
  };

  componentWillUpdate = (newProps, currentState) => {
    const { name } = newProps.weatherInfo;
    const { country, sunrise, sunset } = newProps.weatherInfo.sys;
    const { description } = newProps.weatherInfo.weather[0];
    const { humidity, temp, temp_max, temp_min } = newProps.weatherInfo.main;
    const basicKelv = 273.15;
    // in order to update, need to check if the new props match with old props, it's a checker to prevent the program from running into an infinite loop
    if (newProps.weatherInfo !== this.props.weatherInfo) {
      this.setState({
        isCels: true,
        buttColorAct: 'transparent',
        buttColorNot: 'darkslategrey',
        curr: (temp - basicKelv).toFixed(2),
        max: (temp_max - basicKelv).toFixed(2),
        min: (temp_min - basicKelv).toFixed(2),
        city: name,
        country: country,
        desc: description,
        humid: humidity,
        rise: moment(sunrise * 1000).format('LTS'),
        sunset: moment(sunset * 1000).format('LTS')
      });
    }
    return;
  };

  triggerRefresh = e => {
    e.preventDefault();

    this.props.refreshWeather();
  };

  render() {
    return (
      <div className="weatherContent">
        <div className="containEle">
          <h3
            style={{
              textAlign: 'center',
              textTransform: 'capitalize',
              marginTop: '15px'
            }}>
            {`${this.state.city}, ${this.state.country} — ${this.state.desc}`}
            <Alert handleRefresh={this.triggerRefresh} />
          </h3>
          <div style={{ margin: '1rem 0' }}>
            <button
              onClick={this.convertToC}
              style={{ background: this.state.buttColorNot, color: 'white' }}
              ref={this.buttonCRef}
              className="tempButton">
              °C
            </button>
            <button
              onClick={this.convertToF}
              style={{ background: this.state.buttColorAct, color: 'white' }}
              ref={this.buttonFRef}
              className="tempButton">
              °F
            </button>
          </div>

          <div className="ui equal width container grid gridEle">
            <div className="column">
              <span>Min Temp</span>
              <p>{this.state.min}</p>
            </div>
            <div className="column">
              <span>Current Temp</span>
              <p>{this.state.curr}</p>
            </div>

            <div className="column">
              <span>Max Temp</span>
              <p>{this.state.max}</p>
            </div>
          </div>

          <div className="ui equal width container grid secondGridEle">
            <div className="column">
              <span>Humidity (%)</span>
              <p>{this.state.humid}</p>
            </div>
            <div className="column">
              <span>Sunrise </span>
              <p>{this.state.rise}</p>
            </div>
            <div className="column">
              <span>Sunset</span>
              <p>{this.state.sunset}</p>
            </div>
          </div>
          <div className="ui equal width container grid secondGridEle" />
        </div>
      </div>
    );
  }
}
