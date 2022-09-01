import React, { useContext } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import facebook from '../../assets/social-network-icons/lightTheme/facebook.png';
import facebookForDark from '../../assets/social-network-icons/darkTheme/facebook_forDark.png';
import instForDark from '../../assets/social-network-icons/darkTheme/inst_forDark.png';
import vk from '../../assets/social-network-icons/lightTheme/vk.png';
import vkForDark from '../../assets/social-network-icons/darkTheme/vk_forDark.png';
import instagram from '../../assets/social-network-icons/lightTheme/instagram.png';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

export const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={cx('footer')}>
      <div className={cx('leftBlock')}>
        <div className={cx('textLight')}>
          Проект реализован в рамках стажировки
          <br />
          для Frontend-разработчиков от компании &nbsp;
          <span className={cx('textMedium')}>
            <a
              href="https://framework.team/"
              target="_blank"
              rel="noreferrer"
              className={cx('fwtLink', `fwtLink_${theme}`)}
            >
              Framework Team
            </a>
          </span>
        </div>
        <div className={cx('textLight', 'developerName')}>Иванов Иван, 2021</div>
      </div>
      <div className={cx('icons')}>
        <div>
          <a
            href="https://www.facebook.com/framework.team"
            target="_blank"
            rel="noreferrer"
          >
            <img src={theme === 'light' ? facebook : facebookForDark} alt="facebook" className={cx('icon')} />
          </a>
        </div>
        <div>
          <a href="https://vk.com/frameworkteam" target="_blank" rel="noreferrer">
            <img src={theme === 'light' ? vk : vkForDark} alt="vk" className={cx('icon')} />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/framework.team/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={theme === 'light' ? instagram : instForDark} alt="instagram" className={cx('icon')} />
          </a>
        </div>
      </div>
    </div>
  );
};
