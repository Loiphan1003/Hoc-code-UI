import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import styles from './styles/ClassRoom.module.css';
import Room from './Room';
import JoinClass from './joinclass/JoinClass';
import CreateClass from './createClass/CreateClass';

function ClassRoom(props) {

    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [renderRoom, setRenderRoom] = useState(false);

    useEffect(() => {
        if(openCreate === true || openJoin === true){
            setRenderRoom(true);
            return;
        }
        setRenderRoom(false);
    },[openCreate, openJoin])


    return (
        <>
            <div className={styles.classRoom}>

                {localStorage.getItem("isTeacher") === 'false' &&
                    <div className={styles.joinClass} >
                        <Button variant="contained"
                            sx={
                                {
                                    float: "right",
                                    marginRight: "20px",
                                    backgroundColor: "#24859A",
                                    ':hover': {
                                        backgroundColor: '#309fb7'
                                    }
                                }
                            }
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => setOpenJoin(true)}
                        >
                            Tham gia lớp học
                        </Button>
                    </div>}

                {localStorage.getItem("isTeacher") === 'true' &&
                    <div className={styles.joinClass}>
                        <Button variant="contained"
                            sx={
                                {
                                    float: "right",
                                    marginRight: "20px",
                                    backgroundColor: "#24859A",
                                    ':hover': {
                                        backgroundColor: '#309fb7'
                                    }
                                }
                            }
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() =>  setOpenCreate(true) }
                        >
                            Tạo lớp học
                        </Button>
                    </div>}
                {openCreate && <CreateClass close={setOpenCreate} />}

                {openJoin && <JoinClass close={setOpenJoin} />}
                <div className={styles.classRoomList} >
                    <Room create={renderRoom} />
                </div>
            </div>
        </>

    );
}

export default ClassRoom;