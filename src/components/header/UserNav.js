import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';

import styles from '../header/Header.module.css';
// import loginSlice from '../../redux/loginSlice';
// import { useDispatch } from "react-redux";

function UserNav(props) {

    // const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutAccount = () => {
        auth.signOut();
        localStorage.clear();
        navigate('/Hoc-code-UI');
        alert("User log out");
    }


    return (
        <div className={styles.userNavItems} onClick={props.onClick}>
            <p>Thông tin cá nhân</p>
            <p onClick={() => navigate('/exercise')}>Quản lý bài tập</p>
            <p>Trang cá nhân</p>
            <p onClick={logoutAccount}>Thoát</p>
        </div>
    );
}

export default UserNav;