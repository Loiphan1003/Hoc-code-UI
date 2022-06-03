import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from './styles/UserInformation.module.css';
import NguoiDungAPI from '../../apis/nguoiDungAPI';
import GiangVienAPI from '../../apis/giangVienAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fireStorage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
  });

function UserIformation(props) {

    const [edit, setEdit] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState();
    const [truong, setTruong] = useState("");
    const [linkAvatar, setLinkAvatar] = useState();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [date, setDate] = useState("");
    const [displayName, setDisplayName] = useState("");
    const fileRef = useRef();
    const isTeacher = JSON.parse(localStorage.getItem('isTeacher')); 
    const uId = JSON.parse(localStorage.getItem('uId'));

    useEffect(() => {
        try {
            const data = async () => {
                
                const response = isTeacher ? await GiangVienAPI.getOneGV(uId) :await NguoiDungAPI.getThongTinNguoiDung(uId);
                setLinkAvatar(window.atob(JSON.parse(localStorage.getItem('linkAvatar'))));
                setTruong(response.data.truong);
                setEmail(response.data.email);
                setDisplayName(response.data.tenHienThi);
                let curr = response.data.namSinh;
                let split_curr = curr.split('T');
                const date_res = split_curr[0];
                setDate(date_res);
                setUserName(response.data.hoTen);
            }
            data();
        } catch (error) {
            console.log("Fetch data false: ", error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAvatarPreview = (e) => {
        const file = e.target.files[0];
        fileRef.current = file;
        setAvatarPreview(URL.createObjectURL(file));
    }

    const handleSave = async () => {
        if (avatarPreview !== undefined) {
            try {
                const storageRef = ref(fireStorage, `images/${fileRef.current.name}`);
                await uploadBytes(storageRef, fileRef.current).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        saveToDataBase(uId,userName,displayName,url.toString(),email,date,truong);
                    })
                })

            } catch (error) {
                console.log("Error: ", error);
            }
        }
        else{
            saveToDataBase(uId,userName,displayName,linkAvatar,email,date,truong);
        }
        
    }

    const saveToDataBase = async (uId,userName,displayName,linkAvatar,email,date,truong) => {
        const response = isTeacher ? await GiangVienAPI.AddOrUpdate(uId, userName, email, date, truong,  window.btoa(linkAvatar),displayName)
                                    :NguoiDungAPI.AddOrUpdate(uId, userName, displayName, window.btoa(linkAvatar) , email, date, truong);
        if (response.data === true) {
            localStorage.setItem('linkAvatar', JSON.stringify(window.btoa(linkAvatar)));
            alert("Lưu thành công");
        }
    }

    return (
        <div className={styles.container} >
            <h1>Thông tin</h1>
            <div className={styles.content} >
                <div className={styles.user_Avatar} >
                    <Avatar
                        src={avatarPreview !== undefined ? avatarPreview : linkAvatar}
                        sx={{
                            cursor: "pointer",
                            width: "90px",
                            height: "90px",
                            border: "solid 0.1px rgb(190 169 169)",
                        }}
                    >
                        
                    </Avatar>

                    {edit &&
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => handleAvatarPreview(e)}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                        }
                </div>

                <div className={styles.right_content} >
                    <div className={styles.row} >
                        <label>Họ và tên</label>
                        <input type='text' onChange={(e) => setUserName(e.target.value)} value={userName} readOnly={edit === true ? false : true} />
                    </div>
                    <div className={styles.row} >
                        <label>Tên hiển thị</label>
                        <input type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} readOnly={edit === true ? false : true} />
                    </div>

                    <div className={styles.row} >
                        <label>Địa chỉ Email</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} readOnly={edit === true ? false : true} />
                    </div>

                    <div className={styles.row} >
                        <label>Trường</label>
                        <input type='text' value={truong} onChange={(e) => setTruong(e.target.value)} readOnly={edit === true ? false : true} />
                    </div>

                    <div className={styles.row} >
                        <label>Năm sinh</label>
                        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} readOnly={edit === true ? false : true} />
                    </div>
                </div>
                
                <FontAwesomeIcon icon={faPen} onClick={() => setEdit(!edit)} fontSize='23'
                    style={{color:"#6b6c6e"}}                
                />    
                
            </div>

            {edit &&
                <div className={styles.button} >
                    
                    <Button variant="outlined" onClick={() => setEdit(!edit)}>Hủy</Button>

                    
                    <Button variant="contained" onClick={handleSave}
                        sx={{marginLeft:'15px'}}
                    >
                        Lưu
                    </Button>
                </div>}
        </div>
    );
}

export default UserIformation;