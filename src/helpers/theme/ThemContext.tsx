import React from 'react';

const white = "#FFFFFF";
const black = "#000000";
const grayShade1 = "#212121";
const grayShade2 = "#EEEEEE";
const grayShade3 = "#BDBDBD";
const grayShade4 = "#616161";
const pinkShade1 = "#C2185B";
// const pinkShade2 = "#880E4F";
const pinkShade3 = "#F48FB1";
const blue = "#03A9F4";

export const themes = {
  light: {
    background: white,
    body: black,
    search: grayShade2,
    button: pinkShade1,
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
    text: string,
    link: string,
    darkModeText: string,
    line: string
  },
  checked: boolean
}

export const initialState: ITheme = {
  theme: themes.light,
  checked: false
};

export type Action =
| { type: 'toggleTheme' }

export const reducer = (state: ITheme = initialState, action: Action) => {
  switch (action.type) {
    case 'toggleTheme':
      return {
        ...state,
        theme: state.theme === themes.dark ? themes.light : themes.dark,
        checked: !state.checked
      };
      
    default:
      return state;
  }
}

export const ThemeContext = React.createContext<{
  state: typeof initialState;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {}
});