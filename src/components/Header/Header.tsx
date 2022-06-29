import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import burgerLightMode from '../../assets/burgerLightMode.png';
import burgerDarkMode from '../../assets/burgerDarkMode.png';
import toDarkThemeToggler from '../../assets/toDarkThemeToggler.png';
import toLightThemeToggler from '../../assets/toLightThemeToggler.png';
import logoLightMode from '../../assets/logoLightMode.png';
import logoDarkMode from '../../assets/logoDarkMode.png';
import cancelLight from '../../assets/cancelLight.png';
import cancelDark from '../../assets/cancelDark.png';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

const Header = () => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // тут не закроешь просто css-ом потому что, если у стиля будет условие,
  // завясящее от true/false (в нашем случает от isBurgerMenuOpened), то при
  // уменьшении ширины экрана значение isBurgerMenuOpened не изменится само собой
  // и следовательно стиль {display: none} не сработает

  function displayWindowSize() {
    // функция, закрывающая окно burgerMenu при достижении определённой ширины экрана
    const w = document.documentElement.clientWidth;
    window.addEventListener('resize', displayWindowSize);
    if (w > 768 && isBurgerMenuOpened) {
      setIsBurgerMenuOpened(false);
    }
  }

  displayWindowSize();

  return (
    <div
      className={cx('header', {
        darkMode: theme === 'dark',
        lightMode: theme === 'light',
      })}
    >
      <div className={cx('headerContainer')}>
        <NavLink to="/artists/static">
          <img
            src={theme === 'light' ? logoLightMode : logoDarkMode}
            alt="logo"
          />
        </NavLink>

        <div className={cx('authBlock')}>
          <div className={cx('authBlockTitles', 'cursorPointer')}>
            <NavLink to="/logIn">LOGIN</NavLink>
          </div>
          <div className={cx('authBlockTitles', 'cursorPointer')}>
            <NavLink to="/signUp">SIGN UP</NavLink>
          </div>
          <div
            role="button"
            tabIndex={-1}
            className={cx('nightModeHandler', 'cursorPointer')}
            onClick={toggleTheme}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img
              src={theme === 'light' ? toDarkThemeToggler : toLightThemeToggler}
              alt="crescent"
              className={cx({
                toNightThemeIcon: theme === 'light',
                toLightThemeIcon: theme === 'dark',
              })}
            />
          </div>
        </div>
        <div
          className={cx('mobileMode')}
          onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}
          role="button"
          tabIndex={-1}
          onKeyDown={() => {
            console.log('keyboard listener');
          }}
        >
          <img
            src={theme === 'light' ? burgerLightMode : burgerDarkMode}
            alt="burgerMenu"
          />
        </div>

        <div
          className={cx('burgerMenu', {
            burgerMenuOnClick: isBurgerMenuOpened,
          })}
        >
          <div
            className={cx('burgerMenuOpacityBlock', {
              dark: theme === 'dark',
              light: theme === 'light',
            })}
          >
            {' '}
          </div>
          <div
            className={cx('burgerMenuContent', {
              dark: theme === 'dark',
              light: theme === 'light',
            })}
          >
            <div
              onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}
              className={cx('cancelButton')}
              role="button"
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
            >
              <img
                src={theme === 'light' ? cancelLight : cancelDark}
                alt="cancel"
                className={cx('cursorPointer')}
              />
            </div>
            <div className={cx('burgerMenuContainer')}>
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
                  src={
                    theme === 'light' ? toDarkThemeToggler : toLightThemeToggler
                  }
                  alt="themeIcon"
                  className={cx({
                    toNightThemeIcon: theme === 'light',
                    toLightThemeIcon: theme === 'dark',
                  })}
                />
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className={cx('changeModeTitle')}>
                  {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </span>
              </div>

              <div
                className={cx('loginButtons', 'cursorPointer', 'loginMargin')}
              >
                Log in
              </div>
              <div className={cx('loginButtons', 'cursorPointer')}>Sign up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
