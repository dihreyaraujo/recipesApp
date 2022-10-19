function clickFavoriteRecipe(apiFood, apiDrink, icon, setIcon) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let drink = '';
  let food = '';
  const ZERO = 0;
  let favoriteRecipeFood = '';
  let favoriteRecipeDrink = '';

  if (apiFood) {
    food = apiFood.meals[ZERO];
    favoriteRecipeFood = {
      id: food.idMeal,
      type: 'food',
      nationality: food.strArea,
      category: food.strCategory,
      alcoholicOrNot: '',
      name: food.strMeal,
      image: food.strMealThumb,
    };
  }
  if (apiDrink) {
    drink = apiDrink.drinks[ZERO];
    favoriteRecipeDrink = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
  }
  if (favorites === null && apiFood) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipeFood]));
    setIcon();
  } else if (favorites === null && apiDrink) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipeDrink]));
    setIcon();
  } else if (favorites !== null && apiFood) {
    const newFavorites = [...favorites, favoriteRecipeFood];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setIcon();
  } else if (favorites !== null && apiDrink) {
    const newFavorites = [...favorites, favoriteRecipeDrink];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setIcon();
  }
}

//projeto

export default clickFavoriteRecipe;
