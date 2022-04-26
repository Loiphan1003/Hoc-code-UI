import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import Header from '../../components/header/Header';
import styles from './ClassRoom.module.css';
import Room from './Room';

function ClassRoom(props) {


    const handleJoinClass = ()=>{
        alert("Tham gia lớp học")
    }


    return (
        <>
            <Header data={props.data} />
            <div className={styles.classRoom}>
                <div className={styles.joinClass} onClick={handleJoinClass}>
                    <FontAwesomeIcon className={styles.icon} icon={faSquarePlus} size='2x' />
                    <p>Tham gia lớp học</p>
                </div>

                <div className={styles.classRoomList} >
                    <Room/>
                </div>
            </div>
        </>

    );
}

export default ClassRoom;