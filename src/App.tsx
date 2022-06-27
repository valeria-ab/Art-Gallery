import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
// @ts-ignore
import style from './App.scss';
import Gallery from './components/Gallery/Gallery';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ThemeContext, themes } from './contexts/ThemeContext';
import ArtistPage from './components/ArtistProfile/ArtistPage';
import { IAppStore } from './store/store';
import { RequestStatusType } from './store/app-reducer';
import { Loader } from './components/loader/Loader';
import { ArtistResponseType } from './utils/api';

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

  const loadingStatus = useSelector<IAppStore, RequestStatusType>(
    (state) => state.app.status,
  );
  const artists = useSelector<IAppStore, Array<ArtistResponseType>>(
    (state) => state.gallery.artists,
  );

  if (loadingStatus === 'loading') { return <Loader />; }
  return (
    <div className={componentClassName}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <div className="AppContainer">
          <Header />
          {/* <DeleteModal theme={currentTheme} primaryTitle="dfdf" secondaryTitle="dfdf" /> */}
          <Routes>
            <Route path="/artists/static" element={<Gallery artists={artists} />} />
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
