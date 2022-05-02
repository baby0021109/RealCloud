import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
