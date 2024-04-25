import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "dark", // Set the custom color mode name here
    primary: {
      main: '#9155FD',
    },
    secondary: {
      main: '#f48fb1',
    },
    white:{
      main:"#fff"
    },
    orange:{
      main:"#ffdb0f"
    },
    
    background: {
      default: '',
      // paper: '#121019',
      paper:"rgb(0, 0, 22)"
    },
  },
 
  
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#ada6e7",
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const customerTheme = createTheme({
  palette: {
    mode: "light", // Set the custom color mode name here
    primary: {
      main: '#9155FD',
    },
    secondary: {
      main: '#f48fb1',
    },
    white:{
      main:"#fff"
    },
    orange:{
      main:"#ffdb0f"
    },
    
    background: {
      default: '#121019',
      // paper: '#121019',
      paper:"white"
    },
  },
 
  
});

export {customTheme,lightTheme,customerTheme};
