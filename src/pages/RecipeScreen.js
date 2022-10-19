import { useEffect } from 'react';

function RecipeScreen() {
  useEffect(() => {
    const getListFood = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      console.log(response);
    };
    getListFood();
  });
}

export default RecipeScreen;
