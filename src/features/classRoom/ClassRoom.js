import React, {useState, useEffect} from 'react';
import styles from './ClassRoom.module.css';
import Room from './Room';
import JoinClass from './joinclass/JoinClass';
import CreateClass from './createclass/CreateClass';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useStateIfMounted } from "use-state-if-mounted";


function ClassRoom(props) {

    const [openJoin, setOpenJoin] = useStateIfMounted(false);
    const [openCreate, setOpenCreate] = useStateIfMounted(false);
    const [renderRoom, setRenderRoom] = useState(false);


    useEffect(() => {
        if(openCreate === true || openJoin === true){
            setRenderRoom(true);
            return;
        }
        setRenderRoom(false);
    },[openCreate, openJoin])

    return (
        <div className={styles.classRoom}>
            <div className={styles.area_joinClass}>

                {localStorage.getItem("isTeacher") === 'false' &&
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
                    </Button>}

                {localStorage.getItem("isTeacher") === 'true' &&
                    // <div className={styles.joinClass}>
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
                        onClick={() => setOpenCreate(true)}
                    >
                        Tạo lớp học
                    </Button>}
            </div>

            <div className={styles.classRoomList} >
                <Room render = {renderRoom} />
            </div>
            {openCreate && <CreateClass close={setOpenCreate} />}
            {openJoin && <JoinClass close={setOpenJoin} />}
        </div>
    );
}

export default ClassRoom;