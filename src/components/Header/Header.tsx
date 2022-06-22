import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import burger from '../../assets/burger.png';
import toDarkThemeToggler from '../../assets/toDarkThemeToggler.png';
import toLightThemeToggler from '../../assets/toLightThemeToggler.png';
import logoLightMode from '../../assets/logoLightMode.png';
import logoDarkMode from '../../assets/logoDarkMode.png';
import cancelLight from '../../assets/cancelLight.png';
import cancelDark from '../../assets/cancelDark.png';
import { IAppStore } from '../../store/store';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

const Header = () => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isNightMode = useSelector<IAppStore, boolean>(
    (state) => state.gallery.isNightModeOn,
  );
  const dispatch = useDispatch();

  function displayWindowSize() {
    const w = document.documentElement.clientWidth;
    window.addEventListener('resize', displayWindowSize);
    if (w > 768 && isPopUpOpened) {
      setIsPopUpOpened(false);
    }
  }

  displayWindowSize();

  return (
    <div className={cx('header', { darkMode: theme === 'dark', lightMode: theme === 'light' })}>
      <div className={cx('headerContainer')}>
        <NavLink to="/artists/static">
          <img src={theme === 'light' ? logoLightMode : logoDarkMode} alt="logo" />
        </NavLink>

        <div className={cx('authBlock')}>
          <div className={cx('authBlockTitles', 'cursorPointer')}>LOGIN</div>
          <div className={cx('authBlockTitles', 'cursorPointer')}>SIGN UP</div>
          <div
            role="button"
            tabIndex={-1}
            className={cx('nightModeHandler', 'cursorPointer')}
            // onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
            onClick={toggleTheme}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img
              src={theme === 'light' ? toDarkThemeToggler : toLightThemeToggler}
              alt="crescent"
              className={cx({ toNightThemeIcon: theme === 'light', toLightThemeIcon: theme === 'dark' })}
            />
          </div>
        </div>
        <div
          className={cx('mobileMode')}
          onClick={() => setIsPopUpOpened(!isPopUpOpened)}
          role="button"
          tabIndex={-1}
          onKeyDown={() => {
            console.log('keyboard listener');
          }}
        >
          <img src={burger} alt="burger" />
        </div>

        <div className={cx('popUp', { popUpOnClick: isPopUpOpened, dark: theme === 'dark', light: theme === 'light' })}>
          <div
            onClick={() => setIsPopUpOpened(!isPopUpOpened)}
            className={cx('cancelButton')}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img src={theme === 'light' ? cancelLight : cancelDark} alt="cancel" className={cx('cursorPointer')} />
          </div>
          <div className={cx('popUpContainer')}>
            <div
              role="button"
              className={cx('changeModeBlock', 'cursorPointer')}
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
              onClick={toggleTheme}
            >
              <img
                src={theme === 'light' ? toDarkThemeToggler : toLightThemeToggler}
                alt="themeIcon"
                className={cx({ toNightThemeIcon: theme === 'light', toLightThemeIcon: theme === 'dark' })}
              />
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className={cx('changeModeTitle')}>
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </span>
            </div>

            <div className={cx('loginButtons', 'cursorPointer', 'loginMargin')}>
              Log in
            </div>
            <div className={cx('loginButtons', 'cursorPointer')}>Sign up</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
