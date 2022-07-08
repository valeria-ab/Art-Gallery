import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
// @ts-ignore
import style from './App.scss';
import Gallery from './components/Gallery/Gallery';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ThemeContext, themes } from './contexts/ThemeContext';
import ArtistPage from './components/ArtistProfile/ArtistPage';
import { AppDispatch, IAppStore } from './store/store';
import { RequestStatusType } from './store/app-reducer';
import { Loader } from './components/loader/Loader';
import { ArtistResponseType } from './utils/api';
import { useAxiosPrivate } from './hooks/useAxiosPrivate';
import { getArtistsTC, setArtists } from './store/gallery-reducer';
import { refreshTC } from './store/auth-reducer';
import { AddEditArtist } from './components/modals/AddEditArtist/AddEditArtist';

const cx = classNames.bind(style);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme((prevCurrentTheme) => (
      prevCurrentTheme === themes.light ? themes.dark : themes.light
    ));
  };
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPictures = async () => {
      try {
        const response = await axiosPrivate.get<AxiosResponse<Array<ArtistResponseType>>>('artists',
          { signal: controller.signal });
        // eslint-disable-next-line no-unused-expressions
        isMounted && dispatch(setArtists({ artists: response.data.data }));
      } catch (error) {
        console.error(error);
        dispatch(getArtistsTC());
      }
    };

    getPictures();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // useEffect(() => {
  //   const getPictures = async () => {
  //     try {
  //       dispatch(setArtists({ artists: response.data.data }));
  //     } catch (error) {
  //       console.error(error);
  //       dispatch(getArtistsTC());
  //     }
  //   };
  //   getPictures();
  // }, []);

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
          <AddEditArtist />
          <Routes>
            <Route
              path="/artists/static"
              element={<Gallery artists={artists} />}
            />
            <Route path="/artists/static/:authorId" element={<ArtistPage />} />
            <Route path="/" element={<Navigate to="/artists/static" />} />

            <Route path={'/*'} element={<div>Page not found</div>} />
          </Routes>
          <button type="button" onClick={() => dispatch(refreshTC())}>refresh</button>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
