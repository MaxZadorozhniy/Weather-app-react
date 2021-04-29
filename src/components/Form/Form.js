import React from 'react';
import './form.scss'

const Form = props => (
  <form
    onSubmit={props.weatherMethod}
    className="form"
  >
    <input
      type="text"
      name="city"
      placeholder="City name..."
      className="form__input"
    />
    <button className="form__button">
      Add
    </button>
    <select className="form__select">
      <option>EN</option>
      <option>UA</option>
      <option>RU</option>
    </select>
  </form>
)

export default Form;
