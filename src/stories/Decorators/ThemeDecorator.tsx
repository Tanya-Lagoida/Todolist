import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c54b2',
    },
    secondary: amber
  },
})

export const ThemeDecorator = (story: any) => {
  return <ThemeProvider theme={theme}>
      {(story())}
    </ThemeProvider>
}