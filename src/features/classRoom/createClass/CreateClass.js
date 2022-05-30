import React, { useState } from 'react';
import RoomApi from '../../../apis/roomApi';
import { Dialog, DialogContent, DialogContentText, DialogTitle ,useMediaQuery, useTheme } from '@mui/material';
import styles from '../joinclass/JoinClass.module.css';
import { useNavigate } from 'react-router-dom';
import useLock from '../../../components/useLockBodyScroll'

function CreateClass(props) {

    useLock();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [trueAlert, setTrueAlert] = useState(false);
    // const [idClassJoin, setIdClassJoin] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const getRoomInfo = async (id) => {
        try {
            const response = await RoomApi.getRoomInfo(id)
            if (response.data === undefined) {
                return false;
            }
            // if(response.[PromiseRejectionEvent] === false){
            //     return false
            // }
            console.log(response.data);
            return true;
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }

        // if(response.data)
    }

    const handleCreateClass = () => {

        if (input.length === 0) {
            setOpenAlert(true);
            return;
        }
        let room = {
            TenPhong: input,
            IdChuPhong: localStorage.getItem('User')
        }

        const createClass = async () => {
            try {
                const response = await RoomApi.createRoom(room);
                if (response.data === true) {
                    setOpenAlert(true);
                    setTrueAlert(true);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        createClass();
    }

    return (
        <>
            <div className={styles.backdrop} onClick={() => props.close(false)}></div>
            <div className={styles.joinclass} >
                <h1>Tạo lớp học</h1>
                <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder="Nhập tên phòng học" />
                <button className={styles.button} onClick={() => handleCreateClass()} >Tạo lớp học </button>
            </div>
            <Dialog fullScreen={fullScreen} open={openAlert} onClose={() => setOpenAlert(false)}>
                <DialogTitle id="alert-dialog-title">
                    {trueAlert === true ? "Tạo phòng thành công" : "Vui lòng nhập đầy đủ thông tin?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {trueAlert === true ? "Bạn vừa tạo phòng thành công." : "Hãy xem lại thông tin bạn nhập đã chính xác, kiểm tra đã nhập đầy đủ thông tin."}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>

    );
}

export default CreateClass;