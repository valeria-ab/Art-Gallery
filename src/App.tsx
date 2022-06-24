import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './App.scss';
import ArtistsList from './components/ArtistsList/ArtistsList';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ThemeContext, themes } from './contexts/ThemeContext';
import ArtistPage from './components/ArtistPage/ArtistPage';

const cx = classNames.bind(style);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme((prevCurrentTheme) => (
      prevCurrentTheme === themes.light
        ? themes.dark
        : themes.light
    ));
  };

  const componentClassName = cx('App', {
    dark: currentTheme === 'dark',
    light: currentTheme === 'light',
  });

  return (
    <div className={componentClassName}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <div className="AppContainer">
          <Header />
          <Routes>
            <Route path="/artists/static" element={<ArtistsList />} />
            <Route path="/artists/static/:authorId" element={<ArtistPage />} />
            <Route path="/" element={<Navigate to="/artists/static" />} />

            <Route path={'/*'} element={<div>Page not found</div>} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
