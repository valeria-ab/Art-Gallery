import React from 'react';
import s from './UnauthorizedUserPageHeader.module.scss'
import commonStyles from '../../../common/styles/CommonStyles.module.scss'



export const UnauthorizedUserPageHeader = () => {
  return (
    <div className={s.header}>
      <div>
        <svg width="39" height="15" viewBox="0 0 39 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0V15H2.64434V8.62793H8.70994V6.3501H2.64434V2.27783H9.35142L12.8455 15H15.4542L18.3836 4.4751H18.4977L21.42 15H24.0287L27.5228 2.27783H31.8653V15H34.4882V2.27783H39V0H25.3045L22.6745 11.0303H22.5462L19.7308 0H17.1434L14.3352 11.0229H14.1997L11.5696 0H0Z" fill="#575757" />
        </svg>
      </div>
      <div className={s.authBlock}>
        <div className={commonStyles.h5Heading}>LOGIN</div>
        <div className={commonStyles.h5Heading}>SIGN UP</div>
        <div className={s.nightModeHandler}>
          <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5923 14.1974C16.0574 15.6735 15.1536 16.9925 13.9542 18.0476C12.7548 19.1027 11.2935 19.8642 9.68852 20.2705C8.08355 20.6768 6.38005 20.7164 4.71595 20.3862C3.05185 20.056 1.47391 19.3653 0.109886 18.3698C2.39391 18.519 4.6319 17.9803 6.49829 16.8319C8.36468 15.6835 9.76213 13.9854 10.4873 11.9846C11.2126 9.98374 11.2277 7.7846 10.5306 5.70704C9.83352 3.62947 8.46052 1.78184 6.61134 0.432918C8.29638 0.542676 9.95046 1.02339 11.4396 1.83615C12.9288 2.6489 14.2113 3.77085 15.1832 5.11116C16.1551 6.45147 16.7891 7.97248 17.0339 9.55103C17.2787 11.1296 17.1274 12.7213 16.5923 14.1974Z" fill="#121212" />
          </svg>
        </div>
      </div>
    </div>
  );
}
