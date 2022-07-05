import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import userIcon from '../../../assets/modals/addEditArtist/userIcon.png';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';

const cx = classNames.bind(style);

export const AddEditArtist = () => {
  const [name, setName] = useState('');
  const [yearsOfLife, setYearsOfLife] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
  // <div className={cx('modal')}>
    <div className={cx('addModal')}>
      <div className={cx('container')}>

        <div className={cx('cancel')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z"
              fill="#9C9C9C"
            />
          </svg>

        </div>
        <div className={cx('wrapper')}>
          <div>
            <div className={cx('photoBlock')}>
              {/* <div className={cx('userIcon')}> */}
              <img className={cx('userIcon')} src={userIcon} alt="userIcon" height="60px" width="60px" />
              <p>You can drop your image here</p>
              {/* </div> */}
            </div>
            <Button value="Browse Profile Photo" width="210px" type="outlined" theme={theme} />
          </div>
          <div className={cx('wrap')}>
            <div className={cx('contentContainer')}>
              <div className={cx('inputsBlock', {
                inputsBlock__light: theme === 'light',
                inputsBlock__dark: theme === 'dark',
              })}
              >
                <Input label="Name" type="text" callback={setName} error={null} />
                <Input label="Years of life" type="text" callback={setYearsOfLife} error={null} />
                <Input label="Location" type="text" callback={setLocation} error={null} />
                <TextArea />
              </div>
              <Multiselect />
            </div>
            <Button value="Save" theme={theme} type="filled" width="200px" />
          </div>
        </div>
      </div>
    </div>
  // </div>
  );
};

const TextArea = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  return (
    <label>
      <div className={cx('label')}>Description</div>
      <textarea className={cx('textArea', {
        input__light: theme === 'light',
        input__dark: theme === 'dark',
      })}
      />
    </label>
  );
};

const Multiselect = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
    <div>
      <div className={cx('label', {
        label__light: theme === 'light',
        label__dark: theme === 'dark',
      })}
      >
        Genres*
      </div>
      <div
        className={cx('multiselect', {
          input__light: theme === 'light',
          input__dark: theme === 'dark',
        })}
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
              className={cx('select__icon')}
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
        <div className={cx('selectBody', {
          selectBody__opened: isOpen,
        })}
        >
          {
                        genres.map((g) => (
                          <div key={g}>{g}</div>
                        ))
                    }
        </div>
      </div>
    </div>
  );
};
