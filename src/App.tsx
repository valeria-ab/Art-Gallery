import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// @ts-ignore
import style from './App.scss';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ThemeContext, themes } from './contexts/ThemeContext';
import ArtistPage from './components/ArtistProfile/ArtistPage';
import { AppDispatch } from './store/store';
import { setInitialized, setUserData } from './store/auth-reducer';
import MainPage from './components/MainPage/MainPage';

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
  // const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   dispatch(setUrlParams({ urlParams: Object.fromEntries(searchParams) }));
  //   dispatch(getCardsTC({ data: searchParams }));
  // }, [searchParams]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(setUserData({ refreshToken, accessToken }));
      dispatch(setInitialized({ isInitialized: true }));
    }
  }, []);

  // const loadingStatus = useSelector<IAppStore, RequestStatusType>(
  //   (state) => state.app.status,
  // );

  // if (loadingStatus === 'loading') {
  //   return <Loader />;
  // }

  return (
    <div className={cx('App', currentTheme)}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <div className="AppContainer">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/artists" />} />
            <Route
              path="/artists"
              element={<MainPage />}
            />
            <Route path="/artists/:authorId" element={<ArtistPage />} />
            <Route path={'/*'} element={<div>Page not found</div>} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
