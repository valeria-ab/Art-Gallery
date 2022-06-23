import classNames from 'classnames/bind';
import React from 'react';
// @ts-ignore
import style from './style.scss';
import { Button } from '../Button/Button';
import trashIcon from '../../assets/modals/trashIcon.png';
import cancelIcon from '../../assets/modals/cancelIcon.png';

const cx = classNames.bind(style);

type ModalPropsType = {
  theme: string;
};
export const Modal = ({ theme }: ModalPropsType) => {
  const a = 'a';
  return (
    <div className={cx('modal')}>
      <div className={cx('cancelIconWrapper')}>
        <img src={cancelIcon} alt="cancelIcon" className={cx('cancelIcon')} />
      </div>
      <div className={cx('modalContainer')}>
        <div>
          <img src={trashIcon} alt="trashIcon" className={cx('trashIcon')} />
        </div>
        <div
          className={cx('question', {
            light: theme === 'light',
            dark: theme === 'dark',
          })}
        >
          Do you want to delete this artist profile?
        </div>
        <div
          className={cx('warning', {
            light: theme === 'light',
            dark: theme === 'dark',
          })}
        >
          You will not be able to recover this profile afterwards.
        </div>
        <div className={cx('buttons')}>
          <Button title="delete" theme={theme} />
          <Button title="cancel" theme={theme} />
        </div>
      </div>
    </div>
  );
};
