import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons';
import CourseApi from '../../apis/courseApi';
import styles from './ClassRoom.module.css';
import DevImage from '../../images/userImageDev.png';


function Room(props) {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const data = async () => {
            try {
                const response = await CourseApi.getAll();
                setRooms(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
        // return () => data();
    }, [])

    // console.log(rooms);

    // <NavLink id='nameCourse' className={styles.item_name} to="/courseworkdetail">Hello world</NavLink>
    return (
        <>
            {rooms.map(room => (
                <NavLink to={`/room/${room.name}`} key={room.id} className={styles.room}>
                    <div className={styles.roomheader}>
                        <h1 className={styles.roomName}>{room.name}</h1>
                    </div>
                    <div className={styles.owner}>
                        <img src={DevImage} className={styles.ownerImage} alt='OwnerImage'></img>
                        <p className={styles.ownerName}>nvduy_0511</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.numberStudent}>
                        <FontAwesomeIcon icon={faUserGroup} />
                        <p>00</p>
                    </div>
                </NavLink>
            ))}

        </>

    );
}

export default Room;