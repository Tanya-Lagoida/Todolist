import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider, styled, ThemeOptions } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f55de',
    },
    secondary: {
      main: '#fbc02d',
    },
    warning: {
      main: '#ff6e40',
    }
  }
})

ReactDOM.render(
  <ThemeProvider  theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
