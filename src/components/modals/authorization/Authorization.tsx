import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import { ClientJS } from 'clientjs';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import style from './style.scss';
import loginPic from '../../../assets/modals/authorization/loginPic.png';
import signUpPic from '../../../assets/modals/authorization/signUpPic.png';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Input } from '../../Input/Input';
import cancelIcon from '../../../assets/modals/cancelIcon.png';
import { loginTC, setFingerPrint, signUpTC } from '../../../store/auth-reducer';
import { AppDispatch, IAppStore } from '../../../store/store';
import styles from '../style.module.css';

const cx = classNames.bind(style);

type AuthPropsType = {
    title: string;
    text: string;
    linkText: string;
    buttonTitle: string;
    setLogin: (value: boolean) => void;
    setSignUp: (value: boolean) => void;
    login: boolean;
    signUp: boolean;
};

export const Authorization = ({
  setLogin,
  setSignUp,
  linkText,
  text,
  buttonTitle,
  title,
  login,
  signUp,
}: AuthPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('test@test.test');
  const [password, setPassword] = useState('test123@TEST');
  // console.log('user: test@test.test, pass: test123@TEST');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passError, setPassError] = useState<null | string>(null);

  const blurHandler = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (username.length === 0) {
      setEmailError('The field cannot be empty');
    } else if (!re.test(String(username).toLowerCase())) {
      setEmailError('Invalid Email');
    } else {
      setEmailError(null);
    }
  };
  const passwordBlurHandler = () => {
    if (password.length === 0) {
      setPassError('The field cannot be empty');
    } else if (password.length < 7) {
      setPassError('at least 6 characters');
    } else {
      setPassError(null);
    }
  };

  const onLoginClick = () => {
    setSignUp(false);
    setLogin(true);
  };
  const onSignUpClick = () => {
    setLogin(false);
    setSignUp(true);
  };
  const client = new ClientJS();
  const fingerprint = client.getFingerprint().toString();

  const onSignUpButtonClick = () => {
    dispatch(signUpTC(username, password, fingerprint));
  };
  const onLoginButtonClick = () => {
    dispatch(loginTC(username, password));
  };
  useEffect(() => {
    dispatch(setFingerPrint({ fingerprint }));
  }, [fingerprint]);

  return (
    <div className={styles.modal}>
      <div className={cx('authorization')}>
        <div
          className={cx('authorizationContainer', {
            light: theme === 'light',
            dark: theme === 'dark',
          })}
        >
          <div className={cx('picture')}>
            <img
              src={linkText === 'sign up' ? loginPic : signUpPic}
              alt="authPic"
              width="498px"
            />
          </div>

          <div className={cx('mainBlock')}>
            <div
              className={cx('cancelIconWrapper')}
              onClick={
                                buttonTitle === 'Log In'
                                  ? () => setLogin(!login)
                                  : () => setSignUp(!signUp)
                            }
              role="button"
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
            >
              <img
                src={cancelIcon}
                alt="cancelIcon"
                className={cx('cancelIcon')}
              />
            </div>
            <div
              className={cx('title', {
                dark: theme === 'dark',
                title_mobile_light: theme === 'light',
              })}
            >
              {title}
            </div>
            <div className={cx('text')}>
              {text}
              {' '}
                            &nbsp;
              <span
                onClick={linkText === 'sign up' ? onSignUpClick : onLoginClick}
                className={cx('link', {
                  lightMode: theme === 'light',
                  darkMode: theme === 'dark',
                })}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  console.log('keyboard listener');
                }}
              >
                {linkText}
              </span>
            </div>
            <Input
              label="Email"
              type="email"
              callback={setUsername}
                            // value={username}
              blurHandler={blurHandler}
              error={emailError}
            />
            <Input
              label="Password"
              type="password"
              callback={setPassword}
                            // value={password}
              blurHandler={passwordBlurHandler}
              error={passError}
            />
            <div className={cx('buttonBlock')}>
              <Button
                value={buttonTitle}
                theme={theme}
                type="filled"
                width="200px"
                callback={
                                    linkText === 'sign up'
                                      ? onLoginButtonClick
                                      : onSignUpButtonClick
                                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
