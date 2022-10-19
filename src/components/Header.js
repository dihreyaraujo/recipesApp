import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';

export default function Header(props) {
  const { titulo } = props;

  const [isDisabledSearch, setSearch] = useState(false);
  const [inputDisable, setInput] = useState(false);

  useEffect(() => {
    if (titulo === 'Profile' || titulo === 'Done Recipes'
      || titulo === 'Favorite Recipes') setSearch(true);
  }, [titulo]);

  const inputDisabled = () => (inputDisable ? setInput(false) : setInput(true));

  return (
    <div>
      <div className="header">
        <Link to="/profile">
          <img
            className="img-perfil"
            src={ ProfileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1
          className="title"
          data-testid="page-title"
        >
          {titulo}
        </h1>
        {!isDisabledSearch
          && (
            <button
              className="search-button"
              type="button"
              onClick={ () => inputDisabled() }
            >
              <img
                className="search-button"
                src={ SearchIcon }
                id="searchIcon"
                alt="searchIcon"
                data-testid="search-top-btn"
              />
            </button>)}
      </div>
      <div>
        {inputDisable ? <SearchBar pagina={ titulo } /> : ''}
      </div>
    </div>
  );
}

Header.propTypes = {
  titulo: PropTypes.string,
}.isRequired;
