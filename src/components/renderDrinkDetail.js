import React from 'react';

const renderDrinkDetail = (apiDrink) => {
  const drinkData = apiDrink.drinks[0];
  const drink = Object.entries(apiDrink.drinks[0]);
  const ingredientes = drink.filter((item) => (
    item[0].includes('strIngredient') && item[1] !== null && item[1] !== ''));
  const measures = drink.filter((item) => (
    item[0].includes('strMeasure') && item[1] !== null && item[1] !== ''));
  return (
    <div className="container-recipe-detail">
      <img
        src={ drinkData.strDrinkThumb }
        alt={ drinkData.strDrink }
        data-testid="recipe-photo"
        width="200px"
      />
      <h1 data-testid="recipe-title">{ drinkData.strDrink }</h1>
      <p data-testid="recipe-category">{ drinkData.strAlcoholic }</p>
      { ingredientes.map((element, index) => (
        <div key={ index }>
          <div>
            <div>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {element[1]}
              </p>
            </div>
          </div>
        </div>
      )) }
      { measures.map((element, index) => (
        <div key={ index }>
          <div>
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {element[1]}
            </p>
          </div>
        </div>
      )) }
      <p data-testid="instructions">{ drinkData.strInstructions }</p>
    </div>
  );
};

export default renderDrinkDetail;
