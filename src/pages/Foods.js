import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../Context/MyContext';
import Recipes from './Recipes';
import '../style/Foods.css';

function Foods() {
  const { apiObj } = useContext(MyContext);
  const history = useHistory();

  const apiRender = () => {
    const DOZE = 12;
    const dozeApiObj = apiObj.meals.slice(0, DOZE);
    const mapApi = dozeApiObj.map((food, index) => (
      <Link
        key={ food.idMeal }
        to={ `/foods/${food.idMeal}` }
        data-testid={ `${index}-recipe-card` }
      >
        <div
          id={ food.idMeal }
          name="food"
          className="name-img-card"
        >
          <img
            src={ food.strMealThumb }
            alt="foto da receita"
            data-testid={ `${index}-card-img` }
            width="150px"
            id={ food.idMeal }
            name="food"
          />
          <p
            data-testid={ `${index}-card-name` }
            id={ food.idMeal }
            name="food"
          >
            { food.strMeal }
          </p>
        </div>
      </Link>
    ));
    if (apiObj.meals.length === 1) {
      const itemId = apiObj.meals[0].idMeal;
      const urlItem = `/foods/${itemId}`;
      history.push(urlItem);
    } else {
      return mapApi;
    }
  };

  return (
    <div className="background-food">
      <div className="container-pag-food">
        <Header titulo="Foods" />
        <div className="container-foods">
          { apiObj.meals !== undefined && apiObj.meals.length > 0
            ? apiRender() : <Recipes titulo="foods" /> }
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Foods;
