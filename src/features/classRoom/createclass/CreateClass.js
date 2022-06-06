import React, { useState } from 'react';
import styles from './JoinClass.module.css';
// import { useNavigate } from 'react-router-dom';
import { customAlphabet  } from 'nanoid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhongHocAPI from '../../../apis/phongHocApi';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function CreateClass(props) {

    const [input, setInput] = useState('');
    // const navigate = useNavigate();

    const handleJoinClass = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const joinPhongHoc = async () => {
                    try {

                        if (input.length === 0) {
                            return;
                        }
                        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_abcdefghijklmnopqrstuvwxyz';
                        let roomId = customAlphabet(alphabet, 5);
                        let room = {
                            id: roomId(),
                            TenPhong: input,
                            IdChuPhong: user.uid
                        }
                        const response = await PhongHocAPI.createRoom(room);

                        console.log(room);
                        if (response.data)
                            alert("Tạo thành công");
                        else
                            alert("Tạo that bai");
                    } catch (error) {
                        console.log("Fetch data error: ", error);
                    }
                }
                joinPhongHoc();
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    return (
        <>
            <div className={styles.backdrop} onClick={() => props.close(false)}></div>
            <div className={styles.joinclass} >
                <h1>Tạo lớp học</h1>
                <TextField autoComplete='off' className={styles.input} label="Nhập tên phòng học" variant="filled" onChange={(e) => setInput(e.target.value)} />
                <Button variant="contained"
                    sx={
                        {
                            marginTop: "20px",
                            width: "100%",
                            backgroundColor: "#24859A",
                            ':hover': {
                                backgroundColor: '#309fb7'
                            }
                        }
                    }
                    onClick={handleJoinClass}
                >
                    Tạo lớp học
                </Button>

            </div>

        </>

    );
}

export default CreateClass;