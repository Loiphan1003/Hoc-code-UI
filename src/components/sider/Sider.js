import React from 'react'
import { faCode, faBook, faUser, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import styles from './Sider.module.css'
import companyLogo from '../../images/logo_transparent.png';

function Sider() {
    const SideData = [
        {
            title: 'Quản lý bài lý thuyết',
            path: '/Admin/Quanlybailythuyet',
            icon: <FontAwesomeIcon icon={faBook}/>,
        },
        {
            title: 'Quản lý bài tập code',
            path: '/Admin/Quanlybaitapcode',
            icon: <FontAwesomeIcon icon={faCode}/>,
        },
        {
            title: 'Quản lý người dùng',
            path: '/Admin/Quanlyuser',
            icon: <FontAwesomeIcon icon={faUser}/>,
        },
        {
            title: 'Quản lý giảng viên',
            path: '/Admin/Quanlygv',
            icon: <FontAwesomeIcon icon={faChalkboardTeacher}/>,
        }
    ]

    return (
        <>
            <div className={styles.nav_menu}>
                <div className={styles.header}>
                    <div className={styles.headerAdmin}>
                        <NavLink to="/Admin/home">
                            <img src={companyLogo} alt="Logo"className={styles.logoAdmin} />
                        </NavLink>
                    </div>
                </div>
                {SideData.map((item, index) => {
                    return (
                        <NavLink  key={index} to={item.path} className={styles.nav_name}>
                            <div className={styles.nav_text}>
                                {item.icon}
                                <span className={styles.nav_namemenu}>{item.title}</span>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </>
    )
}

export default Sider