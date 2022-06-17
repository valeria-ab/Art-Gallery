import React from 'react';
import s from './Footer.module.scss';
import CommonStyles from '../../common/styles/CommonStyles.module.scss';
import facebook from '../../assets/social-network-icons/facebook.png';
import vk from '../../assets/social-network-icons/vk.png';
import instagram from '../../assets/social-network-icons/instagram.png';

export const Footer = () => (
  <div className={s.footer}>
    <div className={s.leftBlock}>
      <div className={CommonStyles.paragraphBaseLight16}>
        Проект реализован в рамках стажировки
        <br />
        для Frontend-разработчиков от компании &nbsp;
        <span className={CommonStyles.paragraphBaseMedium16}>
          <a href="https://framework.team/" target="_blank" rel="noreferrer">
            Framework Team
          </a>
        </span>
      </div>
      <div
        className={`${CommonStyles.paragraphBaseLight16} ${s.developerName}`}
      >
        Иванов Иван, 2021
      </div>
    </div>
    <div className={s.icons}>
      <div>
        <a
          href="https://www.facebook.com/framework.team"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook} alt="facebook" className={s.icon} />
        </a>
      </div>
      <div>
        <a href="https://vk.com/frameworkteam" target="_blank" rel="noreferrer">
          <img src={vk} alt="vk" className={s.icon} />
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/framework.team/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="instagram" className={s.icon} />
        </a>
      </div>
    </div>
  </div>
);
