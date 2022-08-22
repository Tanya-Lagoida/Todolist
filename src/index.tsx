import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppWithRedux } from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './Store/store';

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
  <Provider store={store}>
  <ThemeProvider  theme={theme}>
  <React.StrictMode>
    <AppWithRedux />
  </React.StrictMode>
  </ThemeProvider>
  </Provider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
