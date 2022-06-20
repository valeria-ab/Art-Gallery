import React from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './Footer.scss';
import facebook from '../../assets/social-network-icons/facebook.png';
import vk from '../../assets/social-network-icons/vk.png';
import instagram from '../../assets/social-network-icons/instagram.png';

const cx = classNames.bind(style);

export const Footer = () => (
  <div className={cx('footer')}>
    <div className={cx('leftBlock')}>
      <div className={cx('textLight')}>
        Проект реализован в рамках стажировки
        <br />
        для Frontend-разработчиков от компании &nbsp;
        <span className={cx('textMedium')}>
          <a href="https://framework.team/" target="_blank" rel="noreferrer">
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
          <img src={facebook} alt="facebook" className={cx('icon')} />
        </a>
      </div>
      <div>
        <a href="https://vk.com/frameworkteam" target="_blank" rel="noreferrer">
          <img src={vk} alt="vk" className={cx('icon')} />
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/framework.team/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="instagram" className={cx('icon')} />
        </a>
      </div>
    </div>
  </div>
);
