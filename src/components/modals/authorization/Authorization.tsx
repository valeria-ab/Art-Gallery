import React, { useContext } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import authPic from '../../../assets/modals/authorization/authPic.png';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Input } from '../../Input/Input';
import cancelIcon from '../../../assets/modals/cancelIcon.png';

const cx = classNames.bind(style);

export const Authorization = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={cx('authorization')}>
      <div className={cx('authorizationContainer', {
        light: theme === 'light',
        dark: theme === 'dark',
      })}
      >
        <div className={cx('picture')}>
          <img src={authPic} alt="authPic" width="498px" />
        </div>

        <div className={cx('welcomeBack')}>
          <div className={cx('cancelIconWrapper')}>
            <img src={cancelIcon} alt="cancelIcon" className={cx('cancelIcon')} />
          </div>
          <div className={cx('title', {
            dark: theme === 'dark',
            title_mobile_light: theme === 'light',
          })}
          >
            Welcome Back
          </div>
          <div className={cx('text')}>
            If you don't have an account yet, please &nbsp;
            <a
              href="https://framework.team/"
              className={cx('signUpLink', {
                lightMode: theme === 'light',
                darkMode: theme === 'dark',
              })}
            >
              sign up
            </a>
          </div>
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <Button value="Log in" theme={theme} type="filled" width="200px" />
        </div>
      </div>
    </div>
  );
};
