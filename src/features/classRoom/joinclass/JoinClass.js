import React, { useState } from 'react';
import styles from './JoinClass.module.css';
import { useNavigate } from 'react-router-dom';
import useLock from '../../../components/useLockBodyScroll'
import RoomApi from '../../../apis/roomApi';

function JoinClass(props) {

    useLock();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    // const [idClassJoin, setIdClassJoin] = useState('');

    const getRoomInfo = async (id) => {
        try {
            const response = await RoomApi.getRoomInfo(id)
            if(response.data === undefined){
                return false
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

    const handleJoinClass = () => {
        let id = input;
        // console.log("Tham gia lớp với mã: ");
        console.log(getRoomInfo(id));
        // if(getRoomInfo(id) == true){
        //     navigate(`/room/${id}`)
        // }
        // if(getRoomInfo(id) == false){
        //     alert("Phòng không tồn tại");
        // }

    }
    // console.log(input);

    return (
        <>
            <div className={styles.backdrop} onClick={() => props.close(false)}></div>
            <div className={styles.joinclass} >
                <h1>Tham gia lớp học</h1>
                <input className={styles.input} onChange={(e) => setInput(e.target.value)} type='text' placeholder="Nhập mã phòng học" />
                <button className={styles.button} onClick={() => handleJoinClass()} >Tham gia </button>
            </div>
        </>

    );
}

export default JoinClass;