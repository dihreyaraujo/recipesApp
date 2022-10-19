import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');

  function clickFavoriteRecipe(receita, { target }) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null && target.name === 'blackHeartIcon') {
      const deleteFavorite = favorites.filter((element) => element.id !== receita.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
      target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
    }
  }

  const favoriteIcon = (recipe, index) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      const favorite = favorites.some((element) => (
        element.id === recipe.id));
      if (favorite) {
        return (
          <button
            type="button"
            onClick={ (e) => clickFavoriteRecipe(recipe, e) }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite button"
              name="blackHeartIcon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        );
      }
      return (
        <button type="button">
          <img src={ whiteHeartIcon } alt="favorite button" name="blackHeartIcon" />
        </button>
      );
    }
  };

  const copyRecipe = ({ target }) => {
    if (target.name === 'food') {
      copy(`http://apprecipedihrey.netlify.app/foods/${target.id}`);
      target.parentNode.innerHTML = 'Link copied!';
    } else if (target.name === 'drink') {
      copy(`http://apprecipedihrey.netlify.app/drinks/${target.id}`);
      target.parentNode.innerHTML = 'Link copied!';
    }
  };

  const allFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const recipesRender = favoriteRecipes.map((element, index) => (
        <div key={ index } className="container-favorite-recipe">
          <Link
            to={ element.type === 'food'
              ? `foods/${element.id}`
              : `drinks/${element.id}` }
            className="link-recipe"
          >
            <div>
              <img
                src={ element.image }
                alt={ element.name }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { element.type === 'food'
                  ? `${element.nationality} - ${element.category}`
                  : element.alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
              <p>{ element.alcoholicOrNot }</p>
            </div>
          </Link>
          <button
            type="button"
            id={ element.id }
            name={ element.type }
            onClick={ (e) => copyRecipe(e) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="botão compartilhar"
              id={ element.id }
              name={ element.type }
            />
          </button>
          { favoriteIcon(element, index) }
        </div>
      ));
      return recipesRender;
    }
  };

  const favoriteFoods = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const foodsFilter = favoriteRecipes.filter((element) => element.type === 'food');
      const foodsRender = foodsFilter.map((element, index) => (
        <div key={ index } className="container-favorite-recipe">
          <Link to={ `foods/${element.id}` } className="link-recipe">
            <div>
              <img
                src={ element.image }
                alt={ element.name }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${element.nationality} - ${element.category}` }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
            </div>
          </Link>
          <button
            type="button"
            id={ element.id }
            name={ element.type }
            onClick={ (e) => copyRecipe(e) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="botão compartilhar"
            />
          </button>
          { favoriteIcon(element, index) }
        </div>
      ));
      return foodsRender;
    }
  };

  const favoriteDrinks = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const drinksFilter = favoriteRecipes.filter((element) => element.type === 'drink');
      const drinksRender = drinksFilter.map((element, index) => (
        <div key={ index } className="container-favorite-recipe">
          <Link to={ `drinks/${element.id}` } className="link-recipe">
            <div>
              <img
                src={ element.image }
                alt={ element.name }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
              <p data-testid={ `${index}-horizontal-name` }>{ element.name }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { element.alcoholicOrNot }
              </p>
            </div>
          </Link>
          <button
            type="button"
            id={ element.id }
            name={ element.type }
            onClick={ (e) => copyRecipe(e) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="botão compartilhar"
            />
          </button>
          { favoriteIcon(element, index) }
        </div>
      ));
      return drinksRender;
    }
  };

  const onClickFilter = ({ target }) => {
    setFilter(target.innerText);
  };

  const renderFilter = () => {
    if (filter === 'All') {
      return allFavoriteRecipes();
    }
    if (filter === 'Food') {
      return favoriteFoods();
    }
    if (filter === 'Drinks') {
      return favoriteDrinks();
    }
  };

  return (
    <div className="background-food">
      <div className="container-pag-food">
        <Header titulo="Favorite Recipes" />
        <div className="container-foods">
          <div className="filter-favorite">
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ (e) => onClickFilter(e) }
            >
              All
            </button>
            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ (e) => onClickFilter(e) }
            >
              Food
            </button>
            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ (e) => onClickFilter(e) }
            >
              Drinks
            </button>
          </div>
          { renderFilter() }
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
