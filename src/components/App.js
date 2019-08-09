import React, { Component } from 'react';
/* ----------------------------------MODULES---------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* ---------------------------------API----------------------------------------- */
import openweather from '../api/openweather';
/* -------------------------------------------------------------------------- */

const apiConfig = {
  apiKey: process.env.REACT_APP_WEATHER_KEY,
  geoKey: process.env.REACT_APP_GEOCODE_KEY
};

Geocode.setApiKey(apiConfig.geoKey);

export default class App extends Component {
  state = {
    lat: '',
    lon: '',
    errorMess: '',
    weather: ''
  };

  formWasSubmitted = async inputVal => {
    try {
      const response = await Geocode.fromAddress(inputVal);
      const localeInfo = response.results[0];

      this.setState({
        lat: localeInfo.geometry.location.lat,
        lon: localeInfo.geometry.location.lng
      });
      document
        .querySelector('.loader')
        .classList.add('animated', 'fadeOut', 'delay-0s', 'faster');
      if (this.state.weather) {
        document.querySelector('.loader').classList.add('loaderHide');
        this.getWeatherData();
      } else {
        setTimeout(() => {
          document.querySelector('.loader').classList.add('loaderHide');

          this.getWeatherData();
        }, 2000);
      }
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
        document
          .querySelector('.loader')
          .classList.add('animated', 'fadeOut', 'delay-0s', 'faster');

        if (this.state.weather) {
          document.querySelector('.loader').classList.add('loaderHide');
          this.getWeatherData();
        } else {
          setTimeout(() => {
            document.querySelector('.loader').classList.add('loaderHide');

            this.getWeatherData();
          }, 2500);
        }
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

  render() {
    if (this.state.lat && this.state.lon && this.state.weather) {
      return (
        <div className="app">
          <div className="containerEle">
            <WeatherContainer weatherInfo={this.state.weather}>
              <FormInput
                onFormSubmit={this.formWasSubmitted}
                arbMargin="10px auto"
              />
            </WeatherContainer>
          </div>
          <Footer />
        </div>
      );
    } else if (this.state.errorMess && !this.state.lon && !this.state.lat) {
      return (
        <div className="app ">
          <div className="containerEle ">
            <Loading lat={this.state.lat} translateYby="-52%">
              <FormInput
                onLoadSubmit={this.formWasSubmitted}
                arbMargin="15px auto 15px auto"
              />
              <div className="errorFlex">
                <h3>{`Error  - ${this.state.errorMess}`}</h3>
                <p>
                  You need to re-enable location services, which can be done
                  under <em>view site information</em> icon next to the URL
                </p>
              </div>
            </Loading>
            <Footer />
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <div className="containerEle">
          <Loading lat={this.state.lat} translateYby="-55%">
            <FormInput
              onLoadSubmit={this.formWasSubmitted}
              arbMargin="20px auto 20px auto"
            />
            <Button buttonClicked={this.buttonWasClicked} />
          </Loading>
          <Footer />
        </div>
      </div>
    );
  }
}
