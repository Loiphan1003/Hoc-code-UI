import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import classNames from 'classnames/bind'
import styles from '../header/styles/UserNav.module.css';

const cx = classNames.bind(styles);

function UserNav(props) {

    const navigate = useNavigate();

    const logoutAccount = () => {
        auth.signOut();
        localStorage.clear();
        navigate('/Hoc-code-UI');
        alert("User log out");
    }


    return (
        <div className={cx('userNavItems')} onClick={props.onClick}>
            <div className={cx('item_userNav')} >
                <FontAwesomeIcon className={cx('item-icon')} icon={faUser} />
                <p>Thông tin cá nhân</p>
            </div>

            <div className={cx('item_userNav')} onClick={() => navigate('/exercise')} >
                <FontAwesomeIcon className={cx('item-icon')} icon={faAddressBook} />
                <p>Quản lý bài tập</p>
            </div>

            <div className={cx('item_userNav')} onClick={logoutAccount} >
                <FontAwesomeIcon className={cx('item-icon')} icon={faPowerOff} />
                <p>Thoát</p>
            </div>
        </div>
    );
}

export default UserNav;