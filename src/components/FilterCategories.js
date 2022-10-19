import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/FilterCategories.css';

export default function FilterCategories(props) {
  const { categoria, type } = props;

  const [meal, setMeal] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [items, setItems] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    if (type === 'foods') {
      const mealApi = async () => {
        const foodsFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
        const foodsArray = await foodsFetch.json();
        setMeal(foodsArray);
      };
      mealApi();
    }
    if (type === 'drinks') {
      const drinksApi = async () => {
        const drinksFetch = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`);
        const drinksArray = await drinksFetch.json();
        setDrinks(drinksArray);
      };
      drinksApi();
    }
  }, [categoria, type]);

  // useEffect(() => {
  //   if (type === 'foods') return setId('Meal');
  //   if (type === 'drinks') return setId('Drink');
  // }, [categoria, type]);

  useEffect(() => {
    if (type === 'foods') return setItems(meal.meals);
    if (type === 'drinks') return setItems(drinks.drinks);
  }, [categoria, drinks, meal, type]);
  return (
    <div>
      {type === 'foods' ? items && items.slice(0, DOZE).map((item, index) => (
        <Link
          to={ `/foods/${item.idMeal}` }
          key={ item.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <div className="name-img-card">
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              width="150"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
          </div>
        </Link>
      )) : items && items.slice(0, DOZE).map((item, index) => (
        <Link
          to={ `/drinks/${item.idDrink}` }
          key={ item.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <div className="name-img-card">
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              width="150"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ item.strDrink }</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

FilterCategories.propTypes = {
  categoria: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
