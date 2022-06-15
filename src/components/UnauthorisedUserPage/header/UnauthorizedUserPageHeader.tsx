import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './UnauthorizedUserPageHeader.module.scss';
import commonStyles from '../../../common/styles/CommonStyles.module.scss';
import burger from '../../../assets/burger.png';
import crescent from '../../../assets/crescent.png';
import logo from '../../../assets/logo.png';
import cancel from '../../../assets/cancel.png';
import { IAppStore } from '../../../store/store';
import { setIsNightModeOn } from '../../../store/gallery-reducer';

const UnauthorizedUserPageHeader = () => {
  const [popUp, setPopUp] = useState(false);
  const isNightMode = useSelector<IAppStore, boolean>(
    (state) => state.gallery.isNightModeOn,
  );
  const dispatch = useDispatch();

  return (
    <div className={s.header}>
      <div>
        <img src={logo} alt="logo" />
      </div>

      <div className={s.authBlock}>
        <div className={commonStyles.h5Heading}>LOGIN</div>
        <div className={commonStyles.h5Heading}>SIGN UP</div>
        <div
          role="button"
          tabIndex={-1}
          className={s.nightModeHandler}
          onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
          // зачем тут нужен keyboard listener и какой лучше ставить?
          onKeyDown={() => {
            console.log('keyboard listener');
          }}
        >
          <img src={crescent} alt="crescent" className={s.crescent} />
        </div>
      </div>
      <div
        className={s.mobileMode}
        onClick={() => setPopUp(!popUp)}
        role="button"
        tabIndex={-1}
        onKeyDown={() => {
          console.log('keyboard listener');
        }}
      >
        <img src={burger} alt="burger" />
      </div>
      {popUp && (
        <div className={s.popUp}>
          <div
            onClick={() => setPopUp(!popUp)}
            className={s.cancelButton}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            <img src={cancel} alt="cancel" />
          </div>
          <div className={s.popUpContainer}>
            <div
              role="button"
              tabIndex={-1}
              onKeyDown={() => {
                console.log('keyboard listener');
              }}
              onClick={() => dispatch(setIsNightModeOn({ isNightModeOn: true }))}
            >
              <img src={crescent} alt="crescent" className={s.crescent} />
              <span>&nbsp; Dark mode</span>
            </div>
            <div className={`${commonStyles.h1Heading} ${s.cursor}`}>
              Log in
            </div>
            <div className={`${commonStyles.h1Heading} ${s.cursor}`}>
              Sign up
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnauthorizedUserPageHeader;
