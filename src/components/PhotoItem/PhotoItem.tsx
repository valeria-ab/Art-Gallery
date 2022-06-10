import React, {useState} from 'react';
import s from './PhotoItem.module.scss'
import CommonStyles from '../../common/styles/CommonStyles.module.scss'

type PhotoItemPropsType = {
    title: string
    name: string
    picture?: any
}

const PhotoItem = React.memo((props: PhotoItemPropsType) => {
    const [hover, setHover] = useState(false)


    return (
        <div className={s.photoItem__container}>
            <div className={s.photoItem}
                 onMouseOver={() => setHover(true)}
                 onMouseLeave={() => setHover(false)}
            >
                <div className={s.titleContainer}>
                    <div className={s.titleBlock}>
                        <div className={CommonStyles.h4Heading}>Author name</div>
                        <div className={`${CommonStyles.buttonBold12} ${s.years}`}>1850 - 1910</div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default PhotoItem;
