import React from 'react';
import Provider from './Context/Provider';
import Main from './Routes';

function App() {
  return (
    <main>
      <Provider>
        <Main />
      </Provider>
    </main>
  );
}

export default App;
