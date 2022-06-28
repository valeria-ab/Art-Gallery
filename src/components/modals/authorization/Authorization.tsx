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
        authorizationContainer__light: theme === 'light',
        authorizationContainer__dark: theme === 'dark',
      })}
      >
        <div className={cx('picture')}>
          <img src={authPic} alt="authPic" width="498px" />
        </div>

        <div className={cx('welcomeBack')}>
          <div className={cx('cancelIconWrapper')}>
            <img src={cancelIcon} alt="cancelIcon" className={cx('cancelIcon')} />
          </div>
          <div className={cx('title')}>WelcomeBack</div>
          <div>If you don't have an account yet, please sign up</div>
          <Input label="email" />
          <Input label="password" />
          <Button value="Log in" theme={theme} type="filled" width="200px" />
        </div>
      </div>
    </div>
  );
};
