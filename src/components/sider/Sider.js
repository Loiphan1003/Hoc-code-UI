import React, {useState} from 'react'
import { faCode, faBook, faUser, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import styles from './Sider.module.css'
import companyLogo from '../../images/logo_transparent.png';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sider() {

    const [openLogout, setOpenLogout] = useState(false);
    // const TkAdmin = JSON.parse(sessionStorage.getItem("Admin"));
    const nameAdmin = atob(sessionStorage.getItem("Name"));

    const SideData = [
        {
            title: 'Quản lý bài lý thuyết',
            path: '/Admin/Quanlybailythuyet',
            icon: <FontAwesomeIcon icon={faBook} />,
        },
        {
            title: 'Quản lý bài tập code',
            path: '/Admin/Quanlybaitapcode',
            icon: <FontAwesomeIcon icon={faCode} />,
        },
        {
            title: 'Quản lý người dùng',
            path: '/Admin/Quanlyuser',
            icon: <FontAwesomeIcon icon={faUser} />,
        },
        {
            title: 'Quản lý giảng viên',
            path: '/Admin/Quanlygv',
            icon: <FontAwesomeIcon icon={faChalkboardTeacher}  />,
        }
    ]

    const handleLogout = () => {
        sessionStorage.removeItem('Name');
        sessionStorage.removeItem('Admin');
    }
    const handleOpenLogout = () => {
        setOpenLogout(!openLogout);
    }

    return (
        <>
            <div className={styles.nav_menu}>
                <div className={styles.header}>
                    <div className={styles.headerAdmin}>
                        <NavLink to="/Admin/home">
                            <img src={companyLogo} alt="Logo" className={styles.logoAdmin} />
                        </NavLink>
                    </div>
                </div>
                {SideData.map((item, index) => {
                    return (
                        <NavLink key={index} to={item.path} className={(navdata) => (navdata.isActive ? styles.nav_name_active : styles.nav_name)}>
                            <div className={styles.nav_text}>
                                {item.icon}
                                <span className={styles.nav_namemenu}>{item.title}</span>
                            </div>
                        </NavLink>
                    );
                })}

                <div className={styles.account}>
                    <div className={styles.horizontal}></div>
                    <div className={styles.info} onClick={handleOpenLogout}>
                        <FaceTwoToneIcon style={{ fontSize: "50px", textAlign: "center" }} />
                        <span style={{ textAlign: "center", fontSize: '15px', fontWeight: 'bold', marginLeft: '5px' }}>{nameAdmin}</span>
                    </div>
                    <div className={styles.horizontal}></div>
                    {openLogout && <NavLink style={{ color: "black" }} className={styles.Logout} onClick={handleLogout} to={'/Admin'}>
                        <div className={styles.Logout} >
                            <ExitToAppIcon style={{ margin: "0px 10px" }} /> Đăng xuất
                        </div>
                    </NavLink>}
                    <div className={styles.horizontal}></div>
                </div>
            </div>
        </>
    )
}

export default Sider