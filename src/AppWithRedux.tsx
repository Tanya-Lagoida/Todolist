import React from 'react';
import './App.css';
import {
  AppBar,
  Button,
  Container,
  IconButton, Toolbar,
  Typography
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { TodoListLists } from './TodoListLists';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c54b2'
    },
    secondary: amber
  }
});

export function AppWithRedux() {
  return <ThemeProvider theme={theme}>
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <TodoListLists/>
      </Container>
    </div>
  </ThemeProvider>;
}