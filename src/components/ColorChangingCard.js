import React, { useState } from 'react';
// import './ColorChangingCard.css';

const ColorChangingCard = () => {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');

  const allowedColors = ['#ff0000', '#00ff00', '#0000ff', '#ffd500', '#800080', '#000000', '#00dd7d'];
  const themeColors = ['#ffffff', '#555555', '#232121'];

  const changeColors = () => {
    const randomIndex = Math.floor(Math.random() * allowedColors.length);
    const randomColor = allowedColors[randomIndex];
    setPrimaryColor(randomColor);
    setBorderColor(randomColor);
  };

  const changeTheme = () => {
    const themeIndex = Math.floor(Math.random() * themeColors.length);
    const randomTheme = themeColors[themeIndex];
    setBackground(randomTheme);
  };

  return (
    <div className="container-colourCard" style={{ background }}>
      <div className="colourCard">
        <div className="colourBtn" id="colorCard">
          <input type="button" value="Change colors" onClick={changeColors} />
        </div>
        <div className="themeBtn" id="themeCard">
          <input type="button" value="Change Theme" onClick={changeTheme} />
        </div>
      </div>
    </div>
  );
};

export default ColorChangingCard;