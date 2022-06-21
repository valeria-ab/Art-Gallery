import { createContext } from 'react';

export const themes = {
  // light: {
  //   background: '#fff',
  //   textColor: 'black',
  // },
  // dark: {
  //   background: '#5d2222',
  //   textColor: 'white',
  // },
  dark: 'dark',
  light: 'light',
};

export const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  theme: themes.dark, toggleTheme: () => {},
});
