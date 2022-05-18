import React, { useState } from 'react';
import styles from './ClassRoom.module.css';
import Room from './Room';
import JoinClass from './joinclass/JoinClass';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


function ClassRoom(props) {

    const [openJoin, setOpenJoin] = useState(false);


    return (
        <div className={styles.classRoom}>
            <div className={styles.area_joinClass}>

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
            </div>

            <div className={styles.classRoomList} >
                <Room />
            </div>
            {openJoin && <JoinClass close={setOpenJoin} />}
        </div>
    );
}

export default ClassRoom;