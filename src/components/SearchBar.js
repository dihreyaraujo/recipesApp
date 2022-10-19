import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';
import '../style/SearchBar.css';

function SearchBar(props) {
  const { clickSearch,
    handleClickRadioFood,
    handleChangeSearch, handleClickRadioDrink } = useContext(MyContext);
  const { pagina } = props;
  return (
    <div className="search-bar">
      <input
        className="input"
        type="text"
        data-testid="search-input"
        onChange={ handleChangeSearch }
      />
      <div className="inputs-container">
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            onChange={ pagina === 'Drinks'
              ? handleClickRadioDrink : handleClickRadioFood }
            name="radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            onChange={ pagina === 'Foods' ? handleClickRadioFood : handleClickRadioDrink }
            name="radio"
          />
        </label>
        First Letter
        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            onChange={ pagina === 'Foods' ? handleClickRadioFood : handleClickRadioDrink }
            name="radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ clickSearch }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default SearchBar;
