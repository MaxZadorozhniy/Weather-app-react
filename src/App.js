import React from 'react';
import './reset.scss';
import Form from './components/Form/Form';
import Weather from './components/Weather/Weather';

const API_KEY = 'fb9a6c250802a343fe9e20969a886262';

class App extends React.Component {
  state = {
    cards: [],
    error: undefined,
  }

  gettingWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;

    const api_url = await
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_url.json();

    if(city) {
      this.setState(state => ({
        cards: [
          ...state.cards,
          data
        ],
        error: undefined,
      }));
    } else {
      this.setState(state => ({
        error: 'Enter city!'
      }));
    }
  }

  DeleteCard = (id) => {
    this.setState({
      cards: this.state.cards.filter(card => card.id !== id),
    });
  }

  render() {
    return (
      <div>
        <Form  weatherMethod={this.gettingWeather}/>
        <Weather
          cards={this.state.cards}
          error={this.state.error}
          curr={this.state.curr}
          DeleteCard={this.DeleteCard}
        />
      </div>
    )
  }
}

export default App;
