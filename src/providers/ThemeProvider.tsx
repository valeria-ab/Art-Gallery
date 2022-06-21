// import React, { useEffect, useState } from 'react';
// import { ThemeContext, themes } from '../contexts/ThemeContext';
//
// const getTheme = () => {
//   const theme = `${window?.localStorage?.getItem('theme')}`;
//   if (Object.values(themes).includes(theme)) return theme;
//
//   const userMedia = window.matchMedia('(prefers-color-scheme: light)');
//   if (userMedia.matches) return themes.light;
//
//   return themes.dark;
// };
export {};
// const ThemeProvider = (props: { children: React.ReactNode }) => {
//   const { children } = props;
//   const [theme, setTheme] = useState(getTheme);
//
//   useEffect(() => {
//     document.documentElement.dataset.theme = theme;
//     localStorage.setItem('theme', theme);
//   }, [theme]);
//
//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
