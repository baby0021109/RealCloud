import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
