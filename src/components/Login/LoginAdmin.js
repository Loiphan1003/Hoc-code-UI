import React, { useState } from "react";
import styles from './styles/LoginAdmin.module.css'


function LoginAdmin() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        switch (check(userName, password)) {
            case false:
                break;
            case true:
                alert("Đănh nhâp thành công")
                break;
            default:
                break;
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