import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/Profile.css';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="background-food">
      <div className="container-pag-perfil">
        <Header titulo="Profile" />
        <p data-testid="profile-email">{ userEmail && userEmail.email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Logout
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
