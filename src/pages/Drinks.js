import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../Context/MyContext';
import Recipes from './Recipes';
import '../style/Drinks.css';

function Drinks() {
  const { apiObj } = useContext(MyContext);
  const history = useHistory();

  const apiRender = () => {
    const DOZE = 12;
    const dozeApiObj = apiObj.drinks.slice(0, DOZE);
    const mapApi = dozeApiObj.map((drink, index) => (
      <Link
        name="link"
        to={ `/drinks/${drink.idDrink}` }
        key={ drink.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <div
          className="name-img-card"
          id={ drink.idDrink }
          name="drink"
        >
          <img
            src={ drink.strDrinkThumb }
            alt="foto da receita"
            data-testid={ `${index}-card-img` }
            width="150px"
            id={ drink.idDrink }
            name="drink"
          />
          <p
            // className="name-img-card"
            data-testid={ `${index}-card-name` }
            id={ drink.idDrink }
            name="drink"
          >
            {drink.strDrink}
          </p>
          <p
            // className="name-img-card"
            data-testid="recipe-category"
          >
            {drink.strCategory}

          </p>
        </div>
      </Link>
    ));
    if (apiObj.drinks.length === 1) {
      const itemId = apiObj.drinks[0].idDrink;
      const urlItem = `/drinks/${itemId}`;
      history.push(urlItem);
    } else {
      return mapApi;
    }
  };

  return (
    <div className="background-drink">
      <div data-testid="div" className="container-pag-drink">
        <Header titulo="Drinks" />
        <div className="container-drinks">
          {apiObj.drinks !== undefined && apiObj.drinks.length > 0
            ? apiRender() : <Recipes titulo="drinks" />}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
