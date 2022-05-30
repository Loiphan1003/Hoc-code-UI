import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import styles from './styles/UserInformation.module.css';
import NguoiDungAPI from '../../apis/nguoiDungAPI';
import GiangVienAPI from '../../apis/giangVienAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fireStorage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AccessibilityNewSharp } from '@mui/icons-material';
import { async } from '@firebase/util';

function UserIformation(props) {

    const [edit, setEdit] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState();
    const [uId, setUId] = useState('');
    const [updateAvatar, setUpdateAvatar] = useState();
    const [truong, setTruong] = useState("");
    const [linkAvatar, setLinkAvatar] = useState();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [date, setDate] = useState("");
    const [displayName, setDisplayName] = useState("");
    // const [userInformation, setUserInformation] = useState({});
    const fileRef = useRef();

    useEffect(() => {

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                try {
                    const data = async () => {
                        let response = {};
                        if (localStorage.getItem('isTeacher') === 'true') {
                            response = await GiangVienAPI.getOneGV(user.uid)
                        }
                        setUId(user.uid);
                        if (localStorage.getItem("isTeacher") === 'false') {
                            response = await NguoiDungAPI.getThongTinNguoiDung(user.uid);
                        }
                        if (response.data.linkAvatar === null) {
                            setLinkAvatar("");
                        }
                        if (response.data.linkAvatar !== null) {
                            setLinkAvatar(atob(response.data.linkAvatar));
                        }
                        if (response.data.truong === null) {
                            setTruong("");
                        }
                        else if (response.data.truong !== null) {
                            setTruong(response.data.truong);
                        }
                        setEmail(response.data.email);
                        if (response.data.tenHienThi === null) {
                            setDisplayName("");
                        }
                        else if (response.data.tenHienThi !== null) {
                            setDisplayName(response.data.tenHienThi);
                        }
                        if (response.data.namSinh !== null) {
                            let curr = response.data.namSinh;
                            let split_curr = curr.split('T');
                            const date_res = split_curr[0];
                            setDate(date_res);
                        } else if (response.data.namSinh === null) {
                            setDate("");
                        }

                        if (response.data.hoTen === null) {
                            setUserName("");
                        }
                        else if (response.data.hoTen !== null) {
                            setUserName(response.data.hoTen);
                        }
                    }
                    data();
                } catch (error) {
                    console.log("Fetch data false: ", error);
                }
            }
        })
    }, [])



    const handleAvatarPreview = (e) => {
        const file = e.target.files[0];
        fileRef.current = file;
        setAvatarPreview(URL.createObjectURL(file));
    }

    const uploadFirebase = () => {

    }


    const handleSave = async () => {

        let avatar;
        if (avatarPreview !== undefined) {
            try {
                const storageRef = ref(fireStorage, `images/${fileRef.current.name}`);
                await uploadBytes(storageRef, fileRef.current).then((snapshot) => {
                    console.log("SS: ", snapshot.downloadTokens);
                    getDownloadURL(snapshot.ref).then((url) => {

                        const save = async () => {
                            const response = await NguoiDungAPI.EditNguoiDung(uId, userName, displayName, btoa(url.toString()) , email, date, truong);
                            console.log(response.data);
                            if (response.data === true) {
                                alert("Lưu thành công");
                            }
                        }
                        save();
                    })
                })

            } catch (error) {
                console.log("Error: ", error);
            }
        }
        else{
            const save = async () => {
                const response = await NguoiDungAPI.EditNguoiDung(uId, userName, displayName, btoa(linkAvatar), email, date, truong);
                console.log(response.data);
                if (response.data === true) {
                    alert("Lưu thành công không chọn mới avatar");
                }
            }
            save();
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
                    />

                    {edit &&
                        <label className={styles.btn_chose_image} >
                            <input type="file" onChange={(e) => handleAvatarPreview(e)} />
                            <span>Chọn hình ảnh</span>
                        </label>}
                </div>

                <div className={styles.right_content} >
                    <div className={styles.row} >
                        <label>Họ và tên</label>
                        <input type='text' onChange={(e) => setUserName(e.target.value)} value={userName} readOnly={edit === true ? false : true} />
                    </div>
                    <div className={styles.row} >
                        <label>Tên hiện thị</label>
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

                <FontAwesomeIcon icon={faPen} onClick={() => setEdit(!edit)} size="2x" />
            </div>

            {edit &&
                <div className={styles.button} >
                    <button className={styles.button_information_cancel}>
                        Hủy
                    </button>

                    <button className={styles.button_information_save} onClick={() => handleSave()} >
                        Lưu
                    </button>
                </div>}
        </div>
    );
}

export default UserIformation;