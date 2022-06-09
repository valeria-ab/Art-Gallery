import React, {useState} from 'react';
import s from './PhotoItem.module.css'


const PhotoItem = React.memo(() => {
    const [hover, setHover] = useState(false)

   


    return (
        <div className={s.photoItem__container}>
            <div className={s.photoItem}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
               
                {
                    hover
                        ? <div className={`${s.photoItem__Title__common} ${s.photoItem__title__hover}`}>
                            <div className={s.photoItem__title__hover__container}>
                                <div className={s.photoItem__title__hover__title}>picture. name</div>

                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Author: </span>
                                    <span>currentAuthor.name</span>
                                </div>
                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Created: </span>
                                    <span>props.picture.created</span>
                                </div>
                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Location: </span>
                                    <span>currentLocation.location</span>
                                </div>
                            </div>
                        </div>
                        : <div className={`${s.photoItem__Title__common} ${s.photoItem__paintingTitle}`}>
                            <span className={s.photoItem__paintingTitle__container}>picture name</span>
                        </div>
                }

            </div>
        </div>

    );
})

export default PhotoItem;
