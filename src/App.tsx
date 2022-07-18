import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
// @ts-ignore
import style from './App.scss';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ThemeContext, themes } from './contexts/ThemeContext';
import ArtistPage from './components/ArtistProfile/ArtistPage';
import { AppDispatch, IAppStore } from './store/store';
import { RequestStatusType } from './store/app-reducer';
import { Loader } from './components/loader/Loader';
import { ArtistResponseType } from './utils/api';
import { refreshTC, setInitialized, setUserData } from './store/auth-reducer';
import Gallery from './components/Gallery/Gallery';

// @ts-ignore
const cx = classNames.bind(style);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme((prevCurrentTheme) => (
      prevCurrentTheme === themes.light ? themes.dark : themes.light
    ));
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(setUserData({ refreshToken, accessToken }));
      dispatch(setInitialized({ isInitialized: true }));
    }
  }, []);

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
  if (loadingStatus === 'loading') {
    return <Loader />;
  }

  return (
    <div className={componentClassName}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <div className="AppContainer">
          <Header />
          {/* <Authorization /> */}
          {/* <DeleteModal theme={currentTheme} primaryTitle="dfdf" secondaryTitle="dfdf" /> */}
          {/* <AddPicture /> */}
          <Routes>
            <Route
              path="/artists"
              element={<Gallery artists={artists} />}
            />
            <Route path="/artists/:authorId" element={<ArtistPage />} />
            <Route path="/" element={<Navigate to="/artists" />} />

            <Route path={'/*'} element={<div>Page not found</div>} />
          </Routes>
          {/* <button type="button" onClick={() => dispatch(refreshTC())}>refresh</button> */}
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
