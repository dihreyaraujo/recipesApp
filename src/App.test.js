import React from 'react';
import App from './App'
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import chickenMeals from '../cypress/mocks/chickenMeals';
import cocktailDrinks from '../cypress/mocks/cocktailDrinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import FoodDetail from './pages/FoodDetail';
import RecipeInProgress from './pages/RecipeInProgress';
import Drinks from './pages/Drinks';
import FilterCategories from './components/FilterCategories';
import FuncIngredients from './helpers/FuncIngredients';
import Header from './components/Header';
import Recipes from './pages/Recipes';


const mockFetchFood = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(chickenMeals),
    }));
};

const mockFetchDrink = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(cocktailDrinks),
    }));
};

describe('Testa 45% de cobertura da tela de login', () => {
  test('testa se ao digitar o email, o botão está desativado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'test@test.com');
    const button = screen.getByTestId('login-submit-btn');
    expect(button.disabled).toBe(true);
  })
  test('testa se ao clicar no botão, as informações são salvas no localStorage', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'test@test.com');
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, 'testetrybe');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user.email).toBe('test@test.com');
  })
})

describe('Desenvolva 90% de cobertura de testes para o Header', () => {
  test('Verifica se ao clicar no ícone de perfil, é redirecionado para a página /profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const titleFoods = screen.getByText(/foods/i);
    expect(titleFoods).toBeInTheDocument();
    const searchBtn = screen.getByTestId('search-top-btn');
    const searchInputNull = screen.queryByTestId('search-input');
    expect(searchInputNull).not.toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  })
  test('Verifica se o component na página /profile não renderiza o botão search', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const title = screen.getByText(/profile/i);
    expect(title).toBeInTheDocument();
    const searchBtn = screen.queryByTestId('search-top-btn');
    expect(searchBtn).not.toBeInTheDocument();
  })

  //! Erro
  it('testa se o input está desabilitado', () => {
    renderWithRouter(<Header />);
    const button = screen.getByRole('button', { name: /searchicon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const input = screen.getByRole('button', { name: /buscar/i });
    expect(input).toBeInTheDocument();
  })
})

describe('Verifica se os testes cobrem 90% da searchBar', () => {

  test('Verifica se os componentes estão na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(btnCall).toBeInTheDocument();
  })
  test('Verifica se faz a chamada API corretamente na página foods', async () => {
    const { history } = renderWithRouter(<App />);
    mockFetchFood
    history.push('/foods');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);
    const firstItem = await screen.findByTestId('0-card-name');
    expect(firstItem).toBeInTheDocument();
    jest.clearAllMocks()
  })
  test('Verifica se faz a chamada API corretamente na página drinks', async () => {
    const { history } = renderWithRouter(<App />);
    mockFetchDrink
    history.push('/drinks');
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'cocktail');
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);
    const item = await screen.findByTestId('0-card-name');
    expect(item).toBeInTheDocument();
    jest.clearAllMocks()
  })


})
describe('Testa a página Drinks', () => {

  it('Teste se renderiza o Header, Recipes e Footer', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const div = screen.getByTestId('div');
    expect(div).toBeInTheDocument();
  })
  it('Verifica de existe o título "drinks" na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  })
  // it('Verifica se existe a imagem', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/drinks');
  //   const img = screen.getByTestId('drinks-bottom-btn');
  //   expect(img).toBeInTheDocument();
  // })
  // it('Verifica o link', () => {
  //   const { history } = renderWithRouter(<Drinks />);
  //   history.push('/drinks');
  //   const li = screen.getByRole('link', { name: /link/i});
  //   expect(li).toBeInTheDocument();
  // })
})

describe('Testa a página FoodDetails', () => {
  it('Testa a página FoodDetail.js renderiza o componente Header', () => {
    renderWithRouter(<FoodDetail />);
    const header = screen.getByTestId('page-title');
    expect(header).toBeInTheDocument();
  })

})
describe('Testa a página FavoriteRecipes', () => {
  it('Testa a página FavoriteRecipes.js renderiza o componente Header', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks')
    const header = screen.getByTestId('page-title');
    expect(header).toBeInTheDocument();
  })
})

describe('Testa a página DoneRecipes', () => {
  it('Testa se renderiza o Header', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  })
})

describe('Testa a página FavoriteRecipes', () => {
  it('Testa se renderiza o titulo', () => {
    renderWithRouter(<FavoriteRecipes />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  })
})

describe('Testa a página Profile', () => {
  it('Verifica se tem um titulo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const button = screen.getByTestId('profile-done-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    expect(foodBtn).toBeInTheDocument();
  })
  it('Verifica se ao clicar em favorite recipes, altera de página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const button = screen.getByTestId('profile-favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const favBtn = screen.getByText(/favorite recipes/i);
    expect(favBtn).toBeInTheDocument();
    const share = screen.getByTestId('filter-by-drink-btn');
    expect(share).toBeInTheDocument();
  })

  it('Verifica ao clicar no botão logout', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const button = screen.getByTestId('profile-logout-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const login = screen.getByTestId('email-input');
    expect(login).toBeInTheDocument();
  })
})

//! está com erro
// describe('Testa a página FuncIngredients', () => {
//   it('Testa se encontra o input', () => {
//     renderWithRouter(<FuncIngredients />);
//     const label = screen.getByTestId('0-ingredient-step');
//     expect(label).toHaveBeenCalled();
//     const inp = screen.getByRole('input', { name: /checkbox/i })
//     expect(inp).toHaveBeenCalled();
//   })
// })

//! está com erro
// describe('Testa a página FilterCategories', () => {
//   it('Verifica se o card-name aparece na tela', () => {
//     renderWithRouter(<FilterCategories />);
//     const card = screen.getByTestId('0-card-name');
//     expect(card).toHaveBeenCalled();
//   })
//   it('Verifica se o recipe-card aparece na tela', () => {
//     renderWithRouter(<FilterCategories />);
//     const recipeCard = screen.getByTestId('0-recipe-card');
//     expect(recipeCard).toHaveBeenCalled();
//   })
//   it('Verifica se o card-img aparece na tela', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/foods');
//     const cardImg = screen.getByTestId('0-recipe-card');
//     expect(cardImg).toHaveBeenCalled();
//   })
// })



//* RecipeDetails
describe('Testa a página RecipeDetails', () => {

    it('Verifica se encontra o botão de compartilhar', () => {
      renderWithRouter(<RecipeDetails />);
      const button = screen.getByRole('button', { name: /compartilhar/i })
      expect(button).toBeInTheDocument();
    })
    it('Verifica se encontra o botão de favoritar', () => {
      renderWithRouter(<RecipeDetails />);
      const favButton = screen.getByTestId('favButton');
      expect(favButton).toBeInTheDocument();
    })
})


 describe('Testa a página RecipeInProgress.js', () => {
  it('Verifica se existe os botões de share, favorite e finish', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977/in-progress')
    const headerPhoto = screen.getByTestId('favorite-btn');
    expect(headerPhoto).toBeInTheDocument();
    const title = screen.getByTestId('share-btn');
    expect(title).toBeInTheDocument();
    const shareButton = screen.getByTestId('finish-recipe-btn');
    expect(shareButton).toBeInTheDocument();
  })
  // it('Verifica se encontra as informações de bebida, se o caminho for Drinks', () => {
  //   renderWithRouter(<RecipeInProgress />);
  //   const title = screen.getByTestId('recipe-photo');
  //   expect(title).toHaveBeenCalled(1);
  // })

})
describe('Testa a página Recipe', () => {
  it('Verifica se encontra o botão All', () => {
    renderWithRouter(<Recipes />);
    const button = screen.getByTestId('All-category-filter');
    expect(button).toBeInTheDocument();
  })
  //! erro
  // it('Verifica se ao clicar a página é redirecionada', () => {
  //   const { history } = renderWithRouter(<App />);
  //   mockFetchFood;
  //   history.push('/foods/52977');
  //   const item = screen.getByTestId('0-recipe-card');
  //   userEvent.click(item);
  //   expect(location.pathname).to.equal('/foods/52977');
  //   jest.clearAllMocks()
  // })
})

//! erro
// const { RecipeScreen } = require('./pages/RecipeScreen');

// describe('Testa a página RecipeScreen', () => {
//   it('Testa a se existe uma função', async () => {
//     const actual = RecipeScreen();
//     expect(typeof actual === 'object').toBe(true);
//   })
// })

