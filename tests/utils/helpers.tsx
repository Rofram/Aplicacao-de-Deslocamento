import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, RenderResult } from '@testing-library/react';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export const renderWithTheme = (ui: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)