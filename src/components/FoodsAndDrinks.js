import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/FoodsAndDrinks.css';

export default function FoodsAndDrinks(props) {
  const { titulo } = props;

  const [foods, setFoods] = useState([]);
  const [arrayOfItens, setItens] = useState([]);
  const [drinks, setDrink] = useState([]);
  //   const [product, setProduct] = useState([]);
  useEffect(() => {
    if (titulo === 'foods') return setItens(foods.meals);
    if (titulo === 'drinks') return setItens(drinks.drinks);
  }, [titulo, foods.meals, drinks.drinks]);
  useEffect(() => {
    const foodsApi = async () => {
      const foodsFetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const foodsArray = await foodsFetch.json();
      setFoods(foodsArray);
    };
    foodsApi();
    const drinksApi = async () => {
      const drinksFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinksArray = await drinksFetch.json();
      setDrink(drinksArray);
    };
    drinksApi();
  }, []);

  const renderRecipe = () => {
    if (titulo === 'foods') {
      const DOZE = 12;
      const dozeApiObjFood = arrayOfItens.slice(0, DOZE);
      const foodRecipe = arrayOfItens && dozeApiObjFood.map((item, index) => (
        <Link to={ `/foods/${item.idMeal}` } key={ item.idMeal }>
          <div
            className="name-img-card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="card-img"
              src={ item.strMealThumb }
              alt={ item.strMeal }
              width="150px"
              data-testid={ `${index}-card-img` }
            />
            <p
              className="food-name"
              data-testid={ `${index}-card-name` }
            >
              {item.strMeal}
            </p>
          </div>
        </Link>
      ));
      return foodRecipe;
    }
    const DOZE = 12;
    const dozeApiObjDrink = arrayOfItens.slice(0, DOZE);
    const drinkRecipe = arrayOfItens && dozeApiObjDrink.map((item, index) => (
      <Link to={ `/drinks/${item.idDrink}` } key={ item.idDrink }>
        <div
          className="name-img-card"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            width="150px"
          />
          <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
        </div>
      </Link>
    ));
    return drinkRecipe;
  };

  return (
    <>
      {arrayOfItens && renderRecipe()}
      {/* <h1>Teste</h1> */}
    </>
  );
}

FoodsAndDrinks.propTypes = {
  titulo: PropTypes.string,
}.isRequired;
