import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './store/auth-context';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(
  <AuthContextProvider> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);


