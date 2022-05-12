import React, { useState } from 'react';
import styles from '../joinclass/JoinClass.module.css';
import { useNavigate } from 'react-router-dom';
import useLock from '../../../components/useLockBodyScroll'
import RoomApi from '../../../apis/roomApi';

function CreateClass(props) {

    useLock();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    // const [idClassJoin, setIdClassJoin] = useState('');

    let room = {
        id: "",
        nam: "",
        owner: ""
    }

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

    const handleCreateClass = () => {

        if(input.length == 0){
            alert("Vui lòng nhập mã phòng học");
            return;
        }
        room = {
            id: "",
            name: input,
            owner: localStorage.getItem('User')
        }
        console.log(room);
    }

    return (
        <>
            <div className={styles.backdrop} onClick={() => props.close(false)}></div>
            <div className={styles.joinclass} >
                <h1>Tạo lớp học</h1>
                <input className={styles.input} onChange={(e) => setInput(e.target.value)} type='text' placeholder="Nhập tên phòng học" />
                <button className={styles.button} onClick={() => handleCreateClass()} >Tạo lớp học </button>
            </div>
        </>

    );
}

export default CreateClass;