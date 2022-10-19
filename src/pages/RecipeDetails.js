import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/RecipeDetails.css';
import PropTypes from 'prop-types';
import clickFavoriteRecipe from '../components/clickFavoriteRecipe';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import renderFoodDetail from '../components/renderFoodDetail';
import renderDrinkDetail from '../components/renderDrinkDetail';

const copy = require('clipboard-copy');

function RecipeDetails(props) {
  const history = useHistory();
  const [foodApi, setFoodApi] = useState();
  const [drinkApi, setDrinkApi] = useState();
  const [foodRecommend, setFoodRecommend] = useState();
  const [drinkRecommend, setDrinkRecommend] = useState();
  const [linkCopied, setLinkCopied] = useState('');
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    if (history.location.pathname.includes('/foods')) {
      const getApiFood = async () => {
        const { match: { params: { id } } } = props;
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const responseFoodDetails = await response.json();
        setFoodApi(responseFoodDetails);
        setRecipeType(`/foods/${responseFoodDetails.meals[0].idMeal}/in-progress`);
      };
      const getApiDrinkRecommend = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const dataDrinkRecommend = await response.json();
        setDrinkRecommend(dataDrinkRecommend);
      };
      getApiFood();
      getApiDrinkRecommend();
    }
    if (history.location.pathname.includes('/drinks')) {
      const getApiDrink = async () => {
        const { match: { params: { id } } } = props;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const responseDrinkDetails = await response.json();
        setDrinkApi(responseDrinkDetails);
        setRecipeType(`/drinks/${responseDrinkDetails.drinks[0].idDrink}/in-progress`);
      };
      const getFoodRecommend = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const responseFoodRecommend = await response.json();
        setFoodRecommend(responseFoodRecommend);
      };
      getApiDrink();
      getFoodRecommend();
    }
  }, [history.location.pathname, props]);

  const transformUrlFood = () => {
    const linkYoutube = foodApi.meals[0].strYoutube;
    const transform = linkYoutube.replace('watch?v=', 'embed/');
    return transform;
  };

  const renderDrinkRecommend = () => {
    const SIX = 6;
    const sixDrinks = drinkRecommend.drinks.slice(0, SIX);
    return (
      <div className="container-scroll">
        { sixDrinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recomendation-card` }
            style={ { width: '150px', margin: '30px' } }
          >
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } width="100px" />
            <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
          </div>
        )) }
      </div>
    );
  };

  const renderFoodRecommend = () => {
    const SIX = 6;
    const sixFoods = foodRecommend.meals.slice(0, SIX);
    return (
      <div className="container-scroll">
        { sixFoods.map((food, index) => (
          <div
            key={ food.idMeal }
            data-testid={ `${index}-recomendation-card` }
            style={ { width: '150px', margin: '30px' } }
          >
            <img src={ food.strMealThumb } alt={ food.strMeal } width="100px" />
            <p data-testid={ `${index}-recomendation-title` }>{ food.strMeal }</p>
          </div>
        )) }
      </div>
    );
  };

  const btnCopyLink = () => {
    copy(`https://apprecipedihrey.netlify.app/${history.location.pathname}`);
    setLinkCopied('Link copied!');
  };

  useEffect(() => {
    const favoriteIcon = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favorites !== null && foodApi) {
        const favorite = favorites.some((element) => (
          element.id === foodApi.meals[0].idMeal));
        if (favorite) {
          setHeartIcon(blackHeartIcon);
        } else {
          setHeartIcon(whiteHeartIcon);
        }
      }
      if (favorites !== null && drinkApi) {
        const favorite = favorites.some((element) => (
          element.id === drinkApi.drinks[0].idDrink));
        if (favorite) {
          setHeartIcon(blackHeartIcon);
        } else {
          setHeartIcon(whiteHeartIcon);
        }
      }
      return whiteHeartIcon;
    };
    favoriteIcon();
  }, [drinkApi, foodApi]);

  const setIcon = () => {
    if (heartIcon === whiteHeartIcon) {
      setHeartIcon(blackHeartIcon);
    } else {
      setHeartIcon(whiteHeartIcon);
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (foodApi) {
        const newFavorites = favorites.filter((element) => (
          element.id !== foodApi.meals[0].idMeal));
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else if (drinkApi) {
        const newFavorites = favorites.filter((element) => (
          element.id !== drinkApi.drinks[0].idDrink));
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      }
    }
  };

  return (
    <div className="background-detail">
      <div className="container-pag-detail">
        <div className="favorite-share">
          <button
            data-testid="favButton"
            type="button"
            onClick={ () => clickFavoriteRecipe(foodApi, drinkApi, heartIcon, setIcon) }
          >
            <img src={ heartIcon } alt="favorite button" data-testid="favorite-btn" />
          </button>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ btnCopyLink }
          >
            Compartilhar
          </button>
          <p>{ linkCopied }</p>
        </div>
        { foodApi && renderFoodDetail(foodApi, transformUrlFood) }
        { drinkRecommend && renderDrinkRecommend() }
        { drinkApi && renderDrinkDetail(drinkApi) }
        { foodRecommend && renderFoodRecommend() }
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
