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


    console.log(props.onClick)
    return (
        <div className={styles.userNavItems} onClick={props.onClick}>
            <p>Thông tin cá nhân</p>
            <NavLink to="/exercise">Quản lý bài tập</NavLink>
            <p>Trang cá nhân</p>
            <p onClick={logoutAccount}>Thoát</p>
        </div>
    );
}

export default UserNav;