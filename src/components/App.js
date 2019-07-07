import React from 'react';
/* ----------------------------------MODULES---------------------------------------- */
import moment from 'moment';
import Geocode from 'react-geocode';
/* -------------------------------------------------------------------------- */
/* ----------------------------------CSS---------------------------------------- */
import '../styles/App.css';
/* -------------------------------------------------------------------------- */
/* -----------------------------------COMPONENTS--------------------------------------- */
import WeatherContainer from './WeatherContainer';
import Loading from './Loading';
import FormInput from './FormInput';
import Footer from './Footer';
import Button from './Button';
import WeatherContent from './WeatherContent';
/* -------------------------------------------------------------------------- */
/* ---------------------------------API----------------------------------------- */
import openweather from '../api/openweather';
/* -------------------------------------------------------------------------- */
/* --------------------------------VIDEO------------------------------------------ */
import video from '../gif/snowfall.mp4';
/* -------------------------------------------------------------------------- */

const apiConfig = {
  apiKey: process.env.REACT_APP_WEATHER_KEY,
  geoKey: process.env.REACT_APP_GEOCODE_KEY
};

Geocode.setApiKey(apiConfig.geoKey);

export default class App extends React.Component {
  state = {
    curTime: '',
    curHour: '',
    backGround: '',
    lat: '',
    lon: '',
    errorMess: '',
    weather: ''
  };

  getTime = () => {
    setInterval(() => {
      this.setState({
        curTime: moment().format('ddd, MMMM Do, YYYY, h:mm:ss A'),
        curHour: moment().hour()
      });
    }, 1000);
  };

  formWasSubmitted = async inputVal => {
    try {
      const response = await Geocode.fromAddress(inputVal);
      const localeInfo = response.results[0];
      this.setState({
        lat: localeInfo.geometry.location.lat,
        lon: localeInfo.geometry.location.lng
      });

      this.getWeatherData();
    } catch (err) {
      alert('Error - zero results returned from that particular place');
    }
  };

  buttonWasClicked = async () => {
    await window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        this.getWeatherData();
      },

      err => {
        this.setState({ errorMess: err.message });
      }
    );
  };

  getWeatherData = async () => {
    try {
      const parsedBody = await openweather.get(`/data/2.5/weather/`, {
        params: {
          lat: this.state.lat,
          lon: this.state.lon,
          appid: apiConfig.apiKey
        }
      });

      this.setState({ weather: parsedBody.data });
    } catch (err) {
      alert(err);
    }
  };

  componentDidMount = () => {
    this.getTime();
  };

  renderContent() {
    if (
      this.state.curTime &&
      this.state.lat &&
      this.state.lon &&
      this.state.weather
    ) {
      return (
        <div className="app">
          <div className="overlay" />
          <video
            autoPlay
            muted
            loop
            id="backgroundVid"
            src={video}
            type="video/mp4"
          />
          <div className="containerEle">
            <WeatherContainer
              weatherInfo={this.state.weather}
              time={this.state.curTime}
              hour={this.state.curHour}>
              <FormInput onFormSubmit={this.formWasSubmitted} />
              <WeatherContent
                refreshWeather={this.getWeatherData}
                weatherInfo={this.state.weather}
              />
            </WeatherContainer>
            <Footer />
          </div>
        </div>
      );
    } else if (this.state.errorMess && !this.state.lon && !this.state.lat) {
      return (
        <div>
          <Loading lat={this.state.lat}>
            <h3
              style={{
                margin: '0 2rem',
                color: 'red'
              }}>{`Error  - ${this.state.errorMess}`}</h3>
            <p style={{ color: 'red' }}>
              To re-enable location services, simply click on the 'view site
              information' icon to the left of the URL
              <br />
              Then, under Location, select the approprate preference
            </p>
            <div style={{ marginTop: '1rem' }}>
              <span>&#8213;</span>
              <h3 className="headerEle">OR</h3>
              <span>&#8213;</span>
            </div>
            <FormInput onLoadSubmit={this.formWasSubmitted} />
          </Loading>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Loading lat={this.state.lat}>
          <FormInput onLoadSubmit={this.formWasSubmitted} />
          <div style={{ marginTop: '1rem' }}>
            <span>&#8213;</span>
            <h3 className="headerEle">OR</h3>
            <span>&#8213;</span>
          </div>
          <Button buttonClicked={this.buttonWasClicked} />
          <div className="ui star rating" id="rater" data-max-rating="3" />
        </Loading>
        <Footer />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
