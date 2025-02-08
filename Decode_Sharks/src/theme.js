import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Green color for matrix effect
    },
    background: {
      default: '#000', // Black background
      paper: '#111', // Dark gray for cards
    },
    text: {
      primary: '#00ff00', // Green text
      secondary: '#00ff00', // Green text
    },
  },
  typography: {
    fontFamily: 'monospace', // Monospace font for hacking style
  },
});

export default theme;
