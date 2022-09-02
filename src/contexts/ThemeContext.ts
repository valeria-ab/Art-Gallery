import { createContext } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

export const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  theme: themes.dark, toggleTheme: () => {},
});
