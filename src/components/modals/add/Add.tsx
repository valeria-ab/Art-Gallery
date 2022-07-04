import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';

const cx = classNames.bind(style);

export const Add = () => {
  const [name, setName] = useState('');
  const [yearsOfLife, setYearsOfLife] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
  // <div className={cx('modal')}>
    <div className={cx('addModal')}>
      <div className={cx('container')}>
        <div className={cx('wrap')}>
          <Input label="Name" type="text" callback={setName} error={null} />
          <Input label="Years of life" type="text" callback={setYearsOfLife} error={null} />
          <Input label="location" type="text" callback={setLocation} error={null} />
          <TextArea />
          <Multiselect />
          <Button value="Save" theme={theme} type="filled" width="200px" />
        </div>
      </div>
    </div>
  // </div>
  );
};

const TextArea = () => {
  const [description, setDescription] = useState('');
  return (
    <div className={cx('addModal')}>add</div>
  );
};

const Multiselect = () => {
  const [description, setDescription] = useState('');
  const genres = ['Romanticism', 'Art', 'Nature', 'Bataille', 'Realistic'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [crossIconStyle, setIconCrossIconStyle] = useState({ display: 'none' });

  const onCrossIconClick = (e: any) => {
    e.stopPropagation();
    setTitle('');
    setIconCrossIconStyle({ display: 'none' });
  };
  const onAuthorsOptionClick = (id: number) => {
    setIsOpen(false);
    setIconCrossIconStyle({ display: 'block' });
  };
  const onLocationsOptionClick = (id: number) => {
    setIsOpen(false);
    setIconCrossIconStyle({ display: 'block' });
  };

  return (
    <div
      className={cx('multiselect')}
      onClick={() => setIsOpen(!isOpen)}
            // tabIndex={2}
      onBlur={() => setIsOpen(false)}
      role="button"
      tabIndex={-1}
      onKeyDown={() => {
        console.log('keyboard listener');
      }}
    >
      <div>
        <span>{title}</span>
        <div>
          <div
            onClick={onCrossIconClick}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            &times;
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              console.log('keyboard listener');
            }}
          >
            &#9660;
          </div>

        </div>
      </div>
      <div>
        {
                    genres.map((g) => (
                      <div key={g}>{g}</div>
                    ))
                }
      </div>
    </div>
  );
};
