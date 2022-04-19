import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';

import styles from '../header/Header.module.css';
// import userSlice from "../Redux/userSlice";
// import { useDispatch } from "react-redux";

function UserNav(props) {

    // const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutAccount = () => {
        auth.signOut();

        // dispatch(
        //     userSlice.actions.userLogout({
        //         value: false,
        //     })
        // )
        localStorage.clear();
        navigate('/');
        alert("User log out");
        console.log("User is log out");
    }


    console.log(props.onClick)
    return (
        <div className={styles.userNavItems} onClick={props.onClick}>
            <p>Thông tin cá nhân</p>
            <p>Trang cá nhân</p>
            <p onClick={logoutAccount}>Thoát</p>
        </div>
    );
}

export default UserNav;