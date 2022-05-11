import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import styles from './ClassRoom.module.css';
import Room from './Room';
import JoinClass from './joinclass/JoinClass';

function ClassRoom(props) {

    const [openJoin, setOpenJoin] = useState(false);


    return (
        <>
            <div className={styles.classRoom}>
                <div className={styles.joinClass} onClick={() => setOpenJoin(true)}>
                    <FontAwesomeIcon className={styles.icon} icon={faSquarePlus} size='2x' />
                    <p>Tham gia lớp học</p>
                </div>
                {openJoin && <JoinClass close={setOpenJoin}/>}
                <div className={styles.classRoomList} >
                    <Room/>
                </div>
            </div>
        </>

    );
}

export default ClassRoom;