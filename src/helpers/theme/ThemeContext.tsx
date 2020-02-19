import React, { useReducer } from 'react';
import { ThemeProvider } from 'styled-components';

const white = "#FFFFFF";
const black = "#000000";
const grayShade1 = "#212121";
const grayShade2 = "#EEEEEE";
const grayShade3 = "#BDBDBD";
const grayShade4 = "#616161";
const pinkShade1 = "#C2185B";
const pinkShade3 = "#F48FB1";
const blue = "#03A9F4";

export const themes = {
  light: {
    background: white,
    body: black,
    search: grayShade2,
    button: pinkShade1,
    buttonText: white,
    text: black,
    link: blue,
    darkModeText: pinkShade1,
    line: grayShade3
  },

  dark: {
    background: grayShade1,
    body: white,
    search: grayShade4,
    button: pinkShade3,
    buttonText: black,
    text: white,
    link: pinkShade3,
    darkModeText: pinkShade3,
    line: grayShade3
  }
}

export interface ITheme {
  theme: {
    background: string,
    body: string,
    search: string,
    button: string,
    buttonText: string,
    text: string,
    link: string,
    darkModeText: string,
    line: string
  },
  checked: boolean
}

const userTheme = localStorage.getItem('theme');

export const initialState: ITheme = {
  theme: userTheme === 'dark' ? themes.dark : themes.light,
  checked:  userTheme === 'dark' ? true : false
};

export type Action =
| { type: 'toggleTheme' }

export const reducer = (state: ITheme = initialState, action: Action) => {
  switch (action.type) {
    case 'toggleTheme':
      localStorage.setItem('theme', !state.checked ? 'dark' : 'light')
      return {
        ...state,
        theme: state.theme === themes.dark ? themes.light : themes.dark,
        checked: !state.checked
      };
      
    default:
      return state;
  }
}

const ThemeContext = React.createContext<{
  state: typeof initialState;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {}
});

const ThemesProvider = (props: any): any => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={state.theme}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemesProvider };