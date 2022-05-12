import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import styles from './styles/ClassRoom.module.css';
import Room from './Room';
import JoinClass from './joinclass/JoinClass';
import CreateClass from './createClass/CreateClass';

function ClassRoom(props) {

    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);


    const data = {
        role: "hocvien"
    }

    return (
        <>
            <div className={styles.classRoom}>

                <div className={data.role === 'hocvien' ? styles.joinClass : styles.none} onClick={() => setOpenJoin(true)}>
                    <FontAwesomeIcon className={styles.icon} icon={faSquarePlus} size='2x' />
                    <p>Tham gia lớp học</p>
                </div>

                <div className={data.role === 'giangvien' ? styles.joinClass : styles.none} onClick={() => setOpenCreate(true)}>
                    <FontAwesomeIcon className={styles.icon} icon={faSquarePlus} size='2x' />
                    <p>Tạo lớp học</p>
                </div>
                {openCreate && <CreateClass close={setOpenCreate}/>}

                {openJoin && <JoinClass close={setOpenJoin}/>}
                <div className={styles.classRoomList} >
                    <Room/>
                </div>
            </div>
        </>

    );
}

export default ClassRoom;