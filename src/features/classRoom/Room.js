import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import styles from './ClassRoom.module.css';
import PhongHocAPI from '../../apis/phongHocApi';

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Avatar } from '@mui/material';
import { stringAvatar, stringToBGColor } from '../../components/funC/genColorAvatar'
import { useStateIfMounted } from "use-state-if-mounted";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

function Room({render}) {

    const [rooms, setRooms] = useStateIfMounted([]);
    const R_gridTemplateColumns = {
        xxs: "repeat(1, 1fr)",
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(4, 1fr)"
    }
    const uId = JSON.parse(localStorage.getItem('uId')); 
    const isTeacher = JSON.parse(localStorage.getItem('isTeacher')); 
    useEffect(() => {
        if(!!uId)
        {
            const data = async () => {
                try {

                    const response =  isTeacher ? await PhongHocAPI.getByUidGiangVien(uId) : await PhongHocAPI.getByUid(uId);
                    setRooms(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            data();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render])

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
                            src={window.atob(room.linkAvatar)}
                            {...stringAvatar(room.tenPhong.substr(0,room.tenPhong.length-1))}
                        >
                        </Avatar>
                        <div className={styles.ownerName}>
                            {room.tenHienThi}
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.numberStudent}>
                            <FontAwesomeIcon className={styles.icon_numberStuden} icon={faUserGroup} />
                            <span>{room.soLuongThanhVien}</span>
                        </div>
                    </Item>
                </NavLink>
            ))}

        </Box>
    );
}

export default Room;