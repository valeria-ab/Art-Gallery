import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import style from './style.scss';
import loginPic from '../../../assets/modals/authorization/loginPic.png';
import signUpPic from '../../../assets/modals/authorization/signUpPic.png';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Input } from '../../Input/Input';
import cancelIcon from '../../../assets/modals/cancelIcon.png';

const cx = classNames.bind(style);

type AuthPropsType = {
  title: string;
text: string;
linkText: string;
linkAddress: string;
buttonTitle: string;
    callback?: () => void;
}

export const Authorization = ({
  linkAddress, linkText, text, buttonTitle, title, callback,
}: AuthPropsType) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={cx('authorization')}>
      <div className={cx('authorizationContainer', {
        light: theme === 'light',
        dark: theme === 'dark',
      })}
      >
        <div className={cx('picture')}>
          <img src={linkText === 'sign up' ? loginPic : signUpPic} alt="authPic" width="498px" />
        </div>

        <div className={cx('mainBlock')}>
          <div className={cx('cancelIconWrapper')}>
            <img src={cancelIcon} alt="cancelIcon" className={cx('cancelIcon')} />
          </div>
          <div className={cx('title', {
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
            <NavLink
              to={linkAddress}
              className={cx('signUpLink', {
                lightMode: theme === 'light',
                darkMode: theme === 'dark',
              })}
            >
              {linkText}
            </NavLink>
          </div>
          <Input label="Email" type="email" callback={setEmail} />
          <Input label="Password" type="password" callback={setPassword} />
          <Button
            value={buttonTitle}
            theme={theme}
            type="filled"
            width="200px"
          />
        </div>
      </div>
    </div>
  );
};
