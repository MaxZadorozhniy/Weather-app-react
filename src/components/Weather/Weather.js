  import { buildQueries } from '@testing-library/dom';
  import React from 'react';
  import './weather.scss';
  import red from '../../img/red.png';
  import blue from '../../img/blue.png';

  class Weather extends React.Component {
    state = {
      curr: undefined,
    }

    AddTempC = (temp) => {
      this.setState({
        curr: temp,
      })
    }

    AddTempF = (temp) => {
      this.setState({
        curr: Math.round(temp * 1.8 + 32),
      })
    }

    render() {
      const { cards, error, DeleteCard } = this.props;
      const { curr } = this.state;
      return(
        <div className="weather">
        { cards.length > 0  &&
          cards.map(item => (
            <div className="weather__container">
              <div className="weather__row">
                <p className="weather__city">{item.name}, {item.sys.country}</p>
                <div className="weather__row">
                  <p className="weather__icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                  </p>
                  <p className="weather__description">{item.weather[0].description}</p>
                </div>
              </div>
              <p className="weather__date">{new Date(item.dt*1000).toUTCString().slice(0, -7)}</p>
              <p className="weather__graph">
                {item.main.temp > 0
                  ? <img
                      className="weather__graph weather__graph_red"
                      src={red}
                      alt="warm weather"
                    />
                  : <img
                      className="weather__graph weather__graph_blue"
                      src={blue}
                      alt="cold weather"
                    />
                }
              </p>
              <div className="weather__row">
                <div className="weather__temperature">
                  <p className="weather__temperature_temp">
                    {curr !== item.main.temp
                      ? Math.round(item.main.temp)
                      : Math.round(item.main.temp * 1.8 + 32)
                    }
                    <sup className="weather__temperature_degrees">
                      <span className="weather__temperature_cels" onClick={() => (
                        this.AddTempF(item.main.temp)
                      )}>C° </span>
                      |
                      <span className="weather__temperature_far" onClick={() => (
                        this.AddTempC(item.main.temp)
                      )}> °F</span>
                    </sup>
                  </p>
                  <p className="weather__temperature_feels">
                    {curr !== item.main.temp
                      ? 'Feels like:' + Math.round(item.main.feels_like) + ' °C'
                      : 'Feels like:' + Math.round(item.main.feels_like * 1.8 + 32) + ' °F'
                    }
                  </p>
                </div>
                <div className="weather__about">
                  <p className="weather__about_wind">Wind:
                    <span className="weather__about_span"> {item.wind.speed} m/s</span>
                  </p>
                  <p className="weather__about_humidity">Humidity:
                    <span className="weather__about_span"> {item.main.humidity}%</span>
                  </p>
                  <p className="weather__about_pressure">Pressure:
                    <span className="weather__about_span"> {item.main.pressure}Pa</span>
                  </p>
                </div>
              </div>
              <span
                className="weather__container_delete"
                onClick={() => DeleteCard(item.id)}
              >
                x
              </span>
            </div>
          ))
        }
        <p className="weather__error">{error}</p>
      </div>
      )
    }
  };

  export default Weather;
