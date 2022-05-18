import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import styles from './ClassRoom.module.css';
import PhongHocAPI from '../../apis/phongHocApi';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Avatar } from '@mui/material';
import { stringAvatar, stringToBGColor } from '../../components/funC/genColorAvatar'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

function Room(props) {

    const [rooms, setRooms] = useState([]);
    const R_gridTemplateColumns = {
        xxs: "repeat(1, 1fr)",
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(4, 1fr)"
    }
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const data = async () => {
                    try {
                        const response = await PhongHocAPI.getByUid(user.uid);
                        setRooms(response.data);
                    } catch (error) {
                        console.log("Fetch data error: ", error);
                    }
                }
                data();
            }
        });
    }, [])

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
                        <Avatar className={styles.ownerImage}
                            alt='avatar'
                            sx={{
                                height: "70px",
                                width: "70px",
                                fontSize: "30px"
                            }}
                            {...stringAvatar(room.tenPhong.substr(0,room.tenPhong.length-1))}
                        >
                        </Avatar>
                        <div className={styles.owner}>
                            nvduy_0511
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.numberStudent}>
                            <FontAwesomeIcon className={styles.icon_numberStuden} icon={faUserGroup} />
                            <span>20</span>
                        </div>
                    </Item>
                </NavLink>
            ))}

        </Box>
    );
}

export default Room;