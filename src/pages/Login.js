import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const isDisabled = () => {
    const six = 6;
    let button = true;
    if (email.includes('@')
      && email.includes('.com')
      && password.length > six) {
      button = false;
    }
    return button;
  };

  const onClick = () => {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/foods');
  };

  return (
    <div className="background">
      <div className="container-login">
        <h1 className="login">Login</h1>
        <input
          className="email"
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
          placeholder="Email"
        />
        <input
          className="password"
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
          placeholder="Password"
        />
        <button
          className="button"
          name="button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled() }
          onClick={ onClick }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
