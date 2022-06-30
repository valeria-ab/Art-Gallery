import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { IAppStore } from '../../store/store';
import { setInitialized, setUserData } from '../../store/auth-reducer';
import { Authorization } from '../modals/authorization/Authorization';

const cx = classNames.bind(style);

const Header = () => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isInitialized = useSelector<IAppStore, boolean>(
    (state) => state.auth.isInitialized,
  );
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();

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

  const onLogOutClick = () => {
    dispatch(
      setInitialized({ isInitialized: false }),
    );
    dispatch(
      setUserData({ refreshToken: null, accessToken: null }),
    );
  };

  return (
    <div
      className={cx('header', {
        darkMode: theme === 'dark',
        lightMode: theme === 'light',
      })}
    >
      <div className={cx('headerContainer')}>
        {login && (
          <Authorization
            title="Welcome back"
            buttonTitle="Log In"
            text="If you don't have an account yet, please"
            linkText="sign up"
            setLogin={setLogin}
            setSignUp={setSignUp}
            login={login}
            signUp={signUp}
          />
        )}
        {signUp && (
          <Authorization
            title="Create your profile"
            buttonTitle="Sign Up"
            text="If you already have an account, please"
            linkText="log in"
            setLogin={setLogin}
            setSignUp={setSignUp}
            login={login}
            signUp={signUp}
          />
        )}
        <NavLink to="/artists/static">
          <img
            src={theme === 'light' ? logoLightMode : logoDarkMode}
            alt="logo"
          />
        </NavLink>
        <div className={cx('authBlock')}>
          {!isInitialized && (
            <>
              <div
                className={cx('authBlockTitles', 'cursorPointer')}
                onClick={() => setLogin(true)}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
              >
                LOGIN
              </div>
              <div
                className={cx('authBlockTitles', 'cursorPointer')}
                onClick={() => setSignUp(true)}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
              >
                SIGN UP
              </div>
            </>
          )}

          {isInitialized && (
            <div className={cx('authBlockTitles', 'cursorPointer')}>
              <span
                onClick={onLogOutClick}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
              >
                LOG OUT
              </span>
            </div>
          )}

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

              {!isInitialized && (
                <>
                  <div
                    className={cx(
                      'loginButtons',
                      'cursorPointer',
                      'loginMargin',
                    )}
                    onClick={() => {
                      setLogin(true);
                      setIsBurgerMenuOpened(false);
                    }}
                    role="button"
                    tabIndex={-1}
                    onKeyDown={() => {
                      console.log('keyboard listener');
                    }}
                  >
                    {' '}
                    Log in
                  </div>
                  <div
                    className={cx('loginButtons', 'cursorPointer')}
                    onClick={() => {
                      setSignUp(true);
                      setIsBurgerMenuOpened(false);
                    }}
                    role="button"
                    tabIndex={-1}
                    onKeyDown={() => {
                      console.log('keyboard listener');
                    }}
                  >
                    Sign up
                  </div>
                </>
              )}
              {isInitialized && (
                <div className={cx('loginButtons', 'cursorPointer')}>
                  <span
                    onClick={onLogOutClick}
                    role="button"
                    tabIndex={-1}
                    onKeyDown={() => {
                      console.log('keyboard listener');
                    }}
                  >
                    LOG OUT
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
