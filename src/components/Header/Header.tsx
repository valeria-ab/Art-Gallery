import React, { useState } from 'react';
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

const cx = classNames.bind(style);

const Header = () => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const isNightMode = useSelector<IAppStore, boolean>(
    (state) => state.gallery.isNightModeOn,
  );
  const dispatch = useDispatch();

  // // функция слушателя событий
  // function displayWindowSize() {
  //   // ширину и высоту окна без полос прокрутки
  //   const w = document.documentElement.clientWidth;
  //   const h = document.documentElement.clientHeight;
  //
  //   // Присоединяем функции слушателя событий к событию изменения размера окна
  //   window.addEventListener('resize', displayWindowSize);
  //   if (w > 768 && isPopUpOpened) {
  //     setIsPopUpOpened(false);
  //   }
  // }
  //
  // // Вызов функции в первый раз
  // displayWindowSize();

  return (
    <div className={cx('header')}>
      <div className={cx('headerContainer')}>
        <NavLink to="/artists/static">
          <img src={logo} alt="logo" />
        </NavLink>

        <div className={cx('authBlock')}>
          <div className={cx('popUpTitles')}>LOGIN</div>
          <div className={cx('popUpTitles')}>SIGN UP</div>
          <div
            role="button"
            tabIndex={-1}
            className={cx('nightModeHandler')}
            onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
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
              className={cx('changeModeBlock', 'cursorPointer', 'changeModeTitle')}
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
              onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
            >
              <img src={crescent} alt="crescent" className={cx('crescent')} />
              <span>&nbsp; Dark mode</span>
            </div>

            <div className={cx('loginButtons', 'cursorPointer')}>Log in</div>
            <div className={cx('loginButtons', 'cursorPointer')}>Sign up</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
