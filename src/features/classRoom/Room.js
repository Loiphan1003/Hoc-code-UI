import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
// import CourseApi from '../../apis/courseApi';
import styles from './styles/ClassRoom.module.css';
import RoomApi from '../../apis/roomApi';
// import { getAuth } from 'firebase/auth';
import Box from "@mui/material/Box";
import { R_gridTemplateColumns, Item } from './setup';
import { stringAvatar, stringToBGColor } from '../../components/funC/genColorAvatar'
import { Avatar } from '@mui/material';




function Room({ create }) {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (create === false) {
            const data = async () => {
                try {
                    if (localStorage.getItem("isTeacher") === "false") {
                        const response = await RoomApi.getRoomByUIdStudent(localStorage.getItem("User"));
                        setRooms(response.data);
                    }
                    if (localStorage.getItem("isTeacher") === "true") {
                        const response = await RoomApi.getRoomInfoByGiangVien(localStorage.getItem("User"));
                        console.log(response.data);
                        setRooms(response.data);
                    }
                    
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            data();
        }
    }, [create])

    return (
        <Box
            sx={{
                width: "auto",
                display: "grid",
                gap: 3,
                gridTemplateColumns: R_gridTemplateColumns,
            }}
        >
            {rooms.map(room => (
                <NavLink to={`/room/${room.id}`} key={room.id} className={styles.room}>
                    <Item sx={{ padding: "0px", width: "300px" }}>
                        <div className={styles.roomheader}
                            style={stringToBGColor(room.tenPhong)}
                        >
                            <h1 className={styles.roomName}>{room.tenPhong}</h1>
                        </div>
                        <div className={styles.owner} >
                            <Avatar className={styles.ownerImage}
                                alt='avatar'
                                sx={{
                                    height: "60px",
                                    width: "70px",
                                    fontSize: "30px"
                                }}
                                {...stringAvatar(room.tenPhong.substr(0, room.tenPhong.length - 1))}
                            >
                            </Avatar>
                            <div className={styles.owner_name}>
                                {room.tenNguoiTao}
                            </div>
                        </div>

                        <div className={styles.line}></div>
                        <div className={styles.numberStudent}>
                            <FontAwesomeIcon className={styles.icon_numberStuden} icon={faUserGroup} />
                            <span>{room.soNguoiThamGia}</span>
                        </div>
                    </Item>
                </NavLink>
            ))}

        </Box>

    );
}

export default Room;