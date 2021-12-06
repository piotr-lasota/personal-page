import { createTheme, responsiveFontSizes } from '@mui/material';
import { deepOrange, purple } from '@mui/material/colors';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#ffb2ff',
        main: '#ea80fc',
        dark: '#b64fc8',
        contrastText: '#000'
      },
      secondary: {
        light: '#ffa06d',
        main: '#ff6e40',
        dark: '#c53d13',
        contrastText: '#000'
      }
    }
  })
);

export default theme;
