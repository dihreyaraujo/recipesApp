import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FuncIngredients = (props) => {
  const { product } = props;
  const [checked, setChecked] = useState({});

  const handleChecked = (e) => {
    const { name } = e.target;
    setChecked({
      ...checked,
      [name]: true,
    });
  };

  const isChecked = (param) => (checked[param] !== false);

  useEffect(() => {
    // const previewChecked = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(previewChecked);
    // if (previewChecked)
    // const data = checked;
    console.log('ronaldo');
    return (() => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(checked));
    });
  }, [checked]);

  useEffect(() => {
    if (product) {
      const arrayNew = product.map((item) => item[1]);
      const objectNew = arrayNew.reduce((obj, curr) => ({
        ...obj,
        [curr]: false,
      }), {});
      setChecked(objectNew);
    }
  }, [product]);

  return (
    <div>
      {product && product.map((ingred, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `checkIngredient${index}` }
          key={ index }
        >
          <input
            type="checkbox"
            name={ ingred[1] }
            id={ `checkIngredient${index}` }
            onChange={ (e) => handleChecked(e) }
            checked={ isChecked(ingred[1]) }
          />
          {ingred[1]}
        </label>
      ))}
    </div>
  );
};

FuncIngredients.propTypes = {
  product: PropTypes.string.isRequired,
};

export default FuncIngredients;
