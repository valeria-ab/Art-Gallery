import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import style from "./App.scss";
import Header from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ThemeContext, themes } from "./contexts/ThemeContext";
import ArtistPage from "./components/ArtistPage/ArtistPage";
import { AppDispatch, IAppStore } from "./store/store";
import {
  checkAuth
} from "./store/auth-reducer";
import MainPage from "./components/MainPage/MainPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";

const cx = classNames.bind(style);

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(
    Cookies.get("theme") || themes.light
  );
  const toggleTheme = () => {
    setCurrentTheme((prevCurrentTheme) =>
      prevCurrentTheme === themes.light ? themes.dark : themes.light
    );
  };
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector<IAppStore, boolean>(
    ({auth}) => auth.isInitialized
  );

  useEffect(() => {
    // const accessToken = Cookies.get("accessToken");
    // const refreshToken = Cookies.get("refreshToken");
    // if (accessToken && refreshToken) {
    //   dispatch(setLoggedIn({ isLoggedIn: true }));
    //   dispatch(setUserData({ refreshToken, accessToken }));
    // }
    // dispatch(setInitialized({ isInitialized: true }));
    dispatch(checkAuth());
  }, [dispatch]);



  useEffect(() => {
    if (currentTheme) Cookies.set("theme", currentTheme);
  }, [currentTheme]);

  if (!isInitialized) {
    return <div>loading...</div>;
  }

  return (
    <div className={cx("App", currentTheme)}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <div className="AppContainer">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/artists" />} />
            <Route path="/artists" element={<MainPage />} />
            <Route path="/artists/:authorId" element={<ArtistPage />} />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
