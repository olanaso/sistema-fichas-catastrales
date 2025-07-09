import React from "react";

const InputWeather = ({ value, icon, name }) => {
  return (
    <div className="weather__item">
      <span>{name}</span>
      <img src={icon} alt={name}/>
      <input type="text" value={value} disabled/>
    </div>
  )
}

export default InputWeather;