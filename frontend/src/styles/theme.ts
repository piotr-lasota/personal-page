import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ['Titillium Web', 'sans-serif'].join(',')
    },
    palette: {
      type: 'light'
    }
  })
);

export default theme;
