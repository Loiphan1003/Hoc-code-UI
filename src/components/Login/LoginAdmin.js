import React, { useState } from "react";
import styles from './styles/LoginAdmin.module.css'
import md5 from 'md5';
import AdminAPI from '../../apis/adminAPI';
import {useNavigate} from 'react-router-dom'

function LoginAdmin() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(check(userName, password) === true){
            const account = {
                taiKhoan: userName,
                matKhau: md5(password)
            }
            try {
                const response = await AdminAPI.login(account);
                console.log(response.data);
                if(response.data === true){
                    sessionStorage.setItem('Admin', JSON.stringify(true));
                    navigate('/admin/home');
                }
            } catch (error) {
                console.log("Login false", error);
            }

        }
    }


    const check = (userName, password) => {
        if (userName.length === 0 && password.length === 0) {
            alert("Vui lòng nhập tài khoản và mật khẩu");
            return false;
        }
        if (userName.length === 0) {
            alert("Vui lòng nhập tài khoản");
            return false;

        }
        if (password.length === 0) {
            alert("Vui lòng nhập mật khẩu");
            return false;
        }
        return true;
    }

    return (
        <div className={styles.bgr_image}>
            <div className={styles.login}>
                <div className={styles.modall}>
                    <h1>Đăng nhập</h1>
                    <input type='text' className={styles.input} onChange={(e) => setUserName(e.target.value)} placeholder="Tài khoản" />
                    <input type='password' className={styles.input} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    <button className={styles.button_DangNhap} onClick={() => handleLogin()} >Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}
export default LoginAdmin;