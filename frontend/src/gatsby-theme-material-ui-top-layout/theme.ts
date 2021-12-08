import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#ffa06d',
        main: '#ff6e40',
        dark: '#c53d13',
        contrastText: '#000'
      },
      secondary: {
        light: '#ffb2ff',
        main: '#ea80fc',
        dark: '#b64fc8',
        contrastText: '#000'
      }
    }
  })
);

export default theme;
