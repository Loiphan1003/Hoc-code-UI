import React from "react";
import styles from './LoginAdmin.module.css'


function LoginAdmin(){
    return (
        <div className={styles.bgr_image}>
            <div className={styles.login}>
                <div className={styles.modall}>
                    <h1>admin</h1>
                    <input className={styles.input} placeholder="Tài khoản" />
                    <input className={styles.input} placeholder="Mật khẩu" />
                    <button className={styles.button_DangNhap} >Đăng nhập</button>
                </div>
            </div>
        </div>
    )
}
export default LoginAdmin;