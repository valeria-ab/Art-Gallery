import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import burger from '../../assets/burger.png';
import crescent from '../../assets/crescent.png';
import logo from '../../assets/logo.png';
import cancel from '../../assets/cancel.png';
import { IAppStore } from '../../store/store';
import { setIsNightModeOn } from '../../store/gallery-reducer';
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
          <img src={logo} alt="logo" />
        </NavLink>

        <div className={cx('authBlock')}>
          <div className={cx('authBlockTitles')}>LOGIN</div>
          <div className={cx('authBlockTitles')}>SIGN UP</div>
          <div
            role="button"
            tabIndex={-1}
            className={cx('nightModeHandler')}
            // onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
            onClick={toggleTheme}
            // value={theme === themes.dark}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img src={crescent} alt="crescent" className={cx('crescent')} />
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

        <div className={cx('popUp', { popUpOnClick: isPopUpOpened })}>
          <div
            onClick={() => setIsPopUpOpened(!isPopUpOpened)}
            className={cx('cancelButton')}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img src={cancel} alt="cancel" className={cx('cursorPointer')} />
          </div>
          <div className={cx('popUpContainer')}>
            <div
              role="button"
              className={cx('changeModeBlock', 'cursorPointer')}
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
              onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
            >
              <img src={crescent} alt="crescent" className={cx('crescent')} />
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className={cx('changeModeTitle')}> Dark mode</span>
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
