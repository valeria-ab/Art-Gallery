import React, {useState} from 'react';
import s from './UnauthorizedUserPageHeader.module.scss';
import style from '../../../common/styles/CommonStyles.module.scss';
import commonStyles from '../../../common/styles/CommonStyles.module.scss';
import burger from '../../../assets/burger.png';
import crescent from '../../../assets/crescent.png';
import logo from '../../../assets/logo.png';
import cancel from '../../../assets/cancel.png';

const UnauthorizedUserPageHeader = () => {
    const [popUp, setPopUp] = useState(false);

    return (
        <div className={s.header}>
            <div>
                <img src={logo} alt="logo"/>
            </div>

            <div className={s.authBlock}>
                <div className={commonStyles.h5Heading}>LOGIN</div>
                <div className={commonStyles.h5Heading}>SIGN UP</div>
                <div className={s.nightModeHandler}>
                    <img src={crescent} alt="crescent" className={s.crescent}/>
                </div>
            </div>
            <div role="menu"
                 className={s.mobileMode}
                 onClick={() => setPopUp(!popUp)}
            >
                <img src={burger} alt="burger"/>
            </div>
            {popUp && (
                <div className={s.popUp}>
                    <div onClick={() => setPopUp(!popUp)}
                         className={s.cancelButton}>
                        <img src={cancel} alt="cancel"/>
                    </div>
                    <div className={s.popUpContainer}>
                        <div>
                            <img src={crescent} alt="crescent"
                                 className={s.crescent}/>&nbsp;
                            <span>Dark mode</span>
                        </div>
                        <div className={`${style.h1Heading} ${s.cursor}`}>Log in</div>
                        <div className={`${style.h1Heading} ${s.cursor}`}>Sign up</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default UnauthorizedUserPageHeader;
