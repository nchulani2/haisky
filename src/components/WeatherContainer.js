import React from 'react';
import { format } from 'date-fns';
import '../styles/WeatherContainer.css';

// var getTime = dateValue => {
//   setInterval(() => {
//     dateValue++;
//     this.setState({
//       curTime: format(new Date(dateValue), 'hh : mm : ss A')
//     });
//   }, 1000);
// };

export default class WeatherContainer extends React.Component {
  state = {
    isCels: '',
    icon: '',
    curTime: '',
    curDay: '',
    curDate: '',
    id: '',
    main: '',
    current: '',
    max: '',
    min: '',
    rise: '',
    set: '',
    deg: '',
    speed: '',
    humidity: '',
    city: '',
    country: '',
    tempDesig: ''
  };

  getDirection = deg => {
    var direction;
    switch (deg > 0 && deg < 360) {
      case deg === 0 || deg === 360:
        direction = 'East';
        break;
      case deg === 90:
        direction = 'North';
        break;
      case deg === 180:
        direction = 'West';
        break;
      case deg === 270:
        direction = 'South';
        break;
      case deg > 0 && deg < 90:
        direction = 'NorthEast';
        break;
      case deg > 90 && deg < 180:
        direction = 'NorthWest';
        break;
      case deg > 180 && deg < 270:
        direction = 'SouthWest';
        break;
      case deg > 270 && deg < 360:
        direction = 'SouthEast';
        break;

      default:
        direction = 'Oops!';
        break;
    }
    return direction;
  };

  convertToF = () => {
    if (this.state.isCels) {
      this.setState({
        current: (this.state.current * 1.8 + 32).toFixed(2),
        min: (this.state.min * 1.8 + 32).toFixed(2),
        max: (this.state.max * 1.8 + 32).toFixed(2),
        tempDesig: '°F',
        isCels: false
      });
    }
    return;
  };

  convertToC = () => {
    if (!this.state.isCels) {
      this.setState({
        current: (((this.state.current - 32) * 5) / 9).toFixed(2),
        min: (((this.state.min - 32) * 5) / 9).toFixed(2),
        max: (((this.state.max - 32) * 5) / 9).toFixed(2),
        tempDesig: '°C',
        isCels: true
      });
    }
    return;
  };

  componentDidMount = () => {
    const { icon, id, main } = this.props.weatherInfo.weather[0],
      { name, dt, timezone } = this.props.weatherInfo,
      { deg, speed } = this.props.weatherInfo.wind,
      { country, sunrise, sunset } = this.props.weatherInfo.sys,
      { humidity, temp, temp_max, temp_min } = this.props.weatherInfo.main;

    const basicKelv = 273.15;
    var epochDate = dt + timezone;

    var dateValue = epochDate * 1000 + 18000000;
    // increments the date based on epoch value from API
    // this.getTime(dateValue);

    // var increment = () => {
    //   dateValue++;
    //   console.log(dateValue);
    //   this.setState({
    //     curTime: format(new Date(dateValue), 'hh : mm : ss A'),
    //     curDay: format(new Date(dateValue), 'dddd'),
    //     curDate: format(new Date(dateValue), 'MMMM Do YYYY')
    //   });
    // };

    // setInterval(increment, 1000);

    this.setState({
      isCels: true,
      icon: icon,
      id: id,
      main: main,
      city: name,
      country: country,
      current: (temp - basicKelv).toFixed(2),
      max: (temp_max - basicKelv).toFixed(2),
      min: (temp_min - basicKelv).toFixed(2),
      tempDesig: '°C',
      humidity: humidity,
      deg: deg,
      speed: speed,
      curTime: format(new Date(dateValue), 'hh : mm : ss A'),
      curDay: format(new Date(dateValue), 'dddd'),
      curDate: format(new Date(dateValue), 'MMMM Do YYYY'),
      rise: format(
        new Date(sunrise + timezone) * 1000 + 18000000,
        'hh : mm : ss A'
      ),
      set: format(
        new Date(sunset + timezone) * 1000 + 18000000,
        'hh : mm : ss A'
      )
    });
  };

  componentWillUpdate = (newProps, currentState) => {
    const { isCels } = currentState,
      { icon, id, main } = newProps.weatherInfo.weather[0],
      { country, sunrise, sunset } = newProps.weatherInfo.sys,
      { name, dt, timezone } = newProps.weatherInfo,
      { humidity, temp, temp_max, temp_min } = newProps.weatherInfo.main,
      { deg, speed } = newProps.weatherInfo.wind;

    const basicKelv = 273.15;
    var epochDate = dt + timezone;
    var dateValue = epochDate * 1000 + 18000000;

    // var increment = () => {
    //   let epoch = dateValue++;
    //   console.log(epoch);
    //   let curTime = format(new Date(epoch), 'hh : mm : ss A');
    //   console.log(curTime);
    //   let curDay = format(new Date(epoch), 'dddd');
    //   let curDate = format(new Date(epoch), 'MMMM Do YYYY');
    //   this.setState({
    //     curTime: curTime,
    //     curDay: curDay,
    //     curDate: curDate
    //   });
    // };

    // setInterval(increment, 1000); // test
    // in order to update, need to check if the new props match with old props, it's a checker to prevent the program from running into an infinite loop
    if (newProps.weatherInfo !== this.props.weatherInfo) {
      if (isCels) {
        this.setState({
          icon: icon,
          id: id,
          main: main,
          city: name,
          country: country,
          current: (temp - basicKelv).toFixed(2),
          max: (temp_max - basicKelv).toFixed(2),
          min: (temp_min - basicKelv).toFixed(2),
          deg: deg,
          speed: speed,
          tempDesig: '°C',
          curTime: format(new Date(dateValue), 'hh : mm : ss A'),
          curDay: format(new Date(dateValue), 'dddd'),
          curDate: format(new Date(dateValue), 'MMMM Do YYYY'),
          rise: format(
            new Date(sunrise + timezone) * 1000 + 18000000,
            'hh : mm : ss A'
          ),
          set: format(
            new Date(sunset + timezone) * 1000 + 18000000,
            'hh : mm : ss A'
          ),
          humidity: humidity
        });
      } else {
        this.setState({
          icon: icon,
          id: id,
          main: main,
          city: name,
          country: country,
          deg: deg,
          speed: speed,
          current: ((temp - basicKelv) * 1.8 + 32).toFixed(2),
          max: ((temp_max - basicKelv) * 1.8 + 32).toFixed(2),
          min: ((temp_min - basicKelv) * 1.8 + 32).toFixed(2),
          tempDesig: '°F',
          curTime: format(new Date(dateValue), 'hh : mm : ss A'),
          curDay: format(new Date(dateValue), 'dddd'),
          curDate: format(new Date(dateValue), 'MMMM Do YYYY'),
          rise: format(
            new Date(sunrise + timezone) * 1000 + 18000000,
            'hh : mm : ss A'
          ),
          set: format(
            new Date(sunset + timezone) * 1000 + 18000000,
            'hh : mm : ss A'
          ),
          humidity: humidity
        });
      }
    }
    return;
  };
  render() {
    console.log(this.props.weatherInfo);
    // for WEATHER
    const {
      icon,
      id,
      main,
      city,
      country,
      current,
      min,
      max,
      rise,
      set,
      humidity,
      tempDesig,
      curTime,
      curDay,
      curDate,
      deg,
      speed
    } = this.state;

    return (
      <div className="weatherContainer">
        <div className="ui grid" id="gridContainer">
          <div
            className="six wide column animated bounceInLeft delay-0s "
            style={{ background: 'rgba(0,0,0,0.65)' }}>
            <div className="flexWeatherCont">
              <div className="flexCaption">Info</div>
              <div className="buttonFlexes">
                <button
                  onClick={this.convertToC}
                  style={{
                    background: this.state.isCels
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'transparent',
                    color: this.state.isCels ? 'rgb(10, 163, 156)' : 'white'
                  }}
                  className="tempButton">
                  °C
                </button>
                <button
                  onClick={this.convertToF}
                  style={{
                    background: !this.state.isCels
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'transparent',
                    color: !this.state.isCels ? 'rgb(10, 163, 156)' : 'white'
                  }}
                  className="tempButton">
                  °F
                </button>
              </div>
              <div className="flexInfo">
                <div className="flexInfoItem">
                  <div>Min</div> <div>{`${min} ${tempDesig}`}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Max</div> <div>{`${max} ${tempDesig}`}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Sunrise</div> <div>{rise}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Sunset</div> <div>{set}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Humidity</div> <div>{`${humidity} %`}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Direction</div>{' '}
                  <div>{`${this.getDirection(Math.ceil(deg))} `}</div>
                </div>
                <div className="flexInfoItem">
                  <div>Speed</div> <div>{`${speed} ㎧`}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="ten wide column animated bounceInRight delay-0s "
            style={{ background: 'rgba(0,0,0,0.4)' }}>
            {this.props.children}
            <div className="flexWeatherCont">
              <div className="flexCaption">{main}</div>

              <div className="flexTime">{curTime}</div>
              <div className="flexDate">{curDate}</div>

              <img
                className="iconEle"
                src={`https://openweathermap.org/img/w/${icon}.png`}
                alt={id}
              />
              <div className="flexTempDay">
                {current} <span className="tempDesig">{tempDesig}</span> <br />{' '}
                on <br />
                {curDay}
              </div>

              <div className="flexArea">
                {city}, {country}
              </div>
            </div>
            <div className="noticeFlex">
              <div>
                *Times may be in offsets of 10-15 minutes due to API being
                updated every 10 minutes
              </div>
            </div>
          </div>
        </div>
        {/* <div className="ui container">
          <div className="ui segment fluid" id="outerEle">
            <div className="ui segment fluid" id="innerEle">
              <div id="flexEle">
                <div className="headerEle">Hai Sky</div>
                <div style={{ textAlign: 'center' }} className="timeEle">
                  {this.props.time}
                  <i className={`ui ${dayState} icon`} />
                </div>
                
              </div>
            </div>
            {this.props.children}
          </div>
        </div> */}
      </div>
    );
  }
}
