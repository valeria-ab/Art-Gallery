import React, {
  ChangeEvent, useContext, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
// @ts-ignore
import style from './style.scss';
import userIcon from '../../../assets/modals/addEditArtist/userIcon.png';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Multiselect } from './Multiselect/Multiselect';

const cx = classNames.bind(style);

export const AddEditArtist = () => {
  const [name, setName] = useState('');
  const [yearsOfLife, setYearsOfLife] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [drag, setDrag] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const inRef = useRef<HTMLInputElement>(null);

  // const upload = (e: ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();
  //   // у таргета files всегда массив, даже если инпуту не поставлен multiply там всего 1 файл
  //   const newFile = e.target.files && e.target.files[0];
  //   if (newFile) {
  //     reader.onloadend = () => {
  //       // dispatch(changeProfilePhoto(reader.result))
  //     };
  //     reader.readAsDataURL(newFile);
  //   }
  // };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setDrag(false);
    // const formData = new FormData();
    // formData.append('file', file);
    // axios.post('url', formData)
  };

  // @ts-ignore
  return (
  // <div className={cx('modal')}>
    <div className={cx('addModal')}>

      {drag
        ? (
          <div
            className={cx('drop_area')}
            onDragStart={(e) => dragHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <div className={cx('drop_infoBlock')}>
              <img className={cx('userIcon')} src={userIcon} alt="userIcon" height="60px" width="60px" />
              <div className={cx('dropAreaTitle')}>Drop your image here</div>
              <div className={cx('description', {
                description_dark: theme === 'dark',
              })}
              >
                Upload only .jpg or .png format less than 3 MB
              </div>
            </div>

          </div>
        )
        : (
          <div
            className={cx('container')}
            onDragStart={(e) => dragHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
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
                <Button value="Browse Profile Photo" callback={upload} width="210px" type="outlined" theme={theme} />
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
        )}

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
      <textarea
        className={cx('textArea', {
          input__light: theme === 'light',
          input__dark: theme === 'dark',
        })}
      />
    </label>
  );
};
