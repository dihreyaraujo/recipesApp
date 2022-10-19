import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [apiRadio, setApiRadio] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [apiObj, setApiObj] = useState('');

  // const clickRecipeDetail = (e) => {
  //   const { target } = e;
  //   if (target.name === 'drink') {
  //     const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  //     setRecipeDetail(url);
  //   } else if (target.name === 'food') {
  //     const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  //     setRecipeDetail(url);
  //   }
  // };

  const handleChangeSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleClickRadioFood = ({ target }) => {
    if (target.id === 'ingredient') {
      const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
      setApiRadio(url);
    } else if (target.id === 'name') {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      setApiRadio(url);
    } else if (target.id === 'first-letter') {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
      setApiRadio(url);
    }
  };

  const handleClickRadioDrink = ({ target }) => {
    if (target.id === 'ingredient') {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      setApiRadio(url);
    } else if (target.id === 'name') {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      setApiRadio(url);
    } else if (target.id === 'first-letter') {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
      setApiRadio(url);
    }
  };

  const clickSearch = async () => {
    const sorryWord = 'Sorry';
    const alert = `${sorryWord}, we haven't found any recipes for these filters.`;
    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    const apiUrl = apiRadio + searchValue;
    if ((apiRadio === urlMeal || apiRadio === urlDrink) && searchValue.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.meals === undefined) {
        if (data.drinks === null) {
          global.alert(alert);
        } else {
          setApiObj(data);
        }
      } else if (data.drinks === undefined) {
        if (data.meals === null) {
          global.alert(alert);
        } else {
          setApiObj(data);
        }
      }
    }
  };

  const initialState = {
    clickSearch,
    handleClickRadioFood,
    handleChangeSearch,
    handleClickRadioDrink,
    apiRadio,
    apiObj,
  };

  return (
    <div>
      <MyContext.Provider value={ initialState }>
        { children }
      </MyContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default Provider;
