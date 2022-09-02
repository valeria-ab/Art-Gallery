import classNames from 'classnames/bind';
import React, { FC, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import style from './style.scss';
import cancelDark from '../../assets/cancelDark.png';
import cancelLight from '../../assets/cancelLight.png';
import errorIcon from '../../assets/toastMessage/error_icon.png';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { AppDispatch, IAppStore } from '../../store/store';
import { setAppError } from '../../store/app-reducer';

const cx = classNames.bind(style);

export const ToastMessage = () => {
  const message = 'Add your error message here.';
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const error = useSelector<IAppStore, string>(
    (state) => state.app.error,
  );
  const onCancelClick = () => {
    dispatch(setAppError({ error: '' }));
  };
  return (
    <div className={cx('toastMessage_wrapper')}>
      <div className={cx('toastMessage', `toastMessage_${theme}`)}>
        <div className={cx('toastMessage_container')}>
          <button
            type="button"
            className={cx('toastMessage_button')}
            onClick={onCancelClick}
          >
            <img
              src={theme === themes.dark ? cancelDark : cancelLight}
              alt="cancelIcon"
              width="16px"
              height="16px"
            />
          </button>

          <div className={cx('toastMessage_contentBlock')}>
            <div className={cx('toastMessage_contentBlock_imgBlock')}>
              <img src={errorIcon} alt="errorIcon" width="16px" height="16px" />
            </div>
            <div>
              <span className={cx('toastMessage_errorTitle')}>Error!</span>
              <p className={cx('toastMessage_errorText')}>{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
