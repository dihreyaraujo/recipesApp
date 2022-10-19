import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          className="drink"
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/foods">
        <img
          className="food"
          src={ mealIcon }
          alt="food icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
