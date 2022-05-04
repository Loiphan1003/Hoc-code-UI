import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./Header.module.css";
import companyLogo from '../../images/logo_transparent.png';
import Login from '../Login/Login';
import UserNav from "./UserNav";
import Backdrop from '../Backdrop';


function Header(props) {

    const data = props.data;


    const [modalopen, setModalOpen] = useState(false);
    const [userNavOpen, setUserNavOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [headerNavBar, setHeaderNavbar] = useState(false);
    // const [dataUser, setDataUser] = useState('');

    const showSideBar = () => setHeaderNavbar(!headerNavBar);

    const menuItem = [
        {
            path: "/practice",
            name: "Luyện tập",
        },
        {
            path: "/theory",
            name: "Lý thuyết",
        },
        {
            path: "/room",
            name: "Phòng học",
        },
    ]

    useEffect(() => {
        if (data !== '') {
            setIsLogin(true);
            return;
        }
        setIsLogin(false);
    }, [data])

   

    if (isLogin === true) {
        return (
            <div id={styles.header} >
                <div className={styles.List_menu}>
                    <NavLink className={styles.logo} to="/home">
                        <img src={companyLogo} alt="Logo" />
                    </NavLink>

                    <div className={styles.navbar} >

                        <div className={styles.Menu_item}>
                            <NavLink to="/practice" >Luyện tập</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/theory" >Lý thuyết</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/room" >Phòng học</NavLink>
                        </div>
                        <div className="animation-click"></div>
                    </div>
                </div>
                <div id={styles.button_logout} >
                    <FontAwesomeIcon className={styles.icon} icon={faBell} alt="notifi" size="2x" />
                    <FontAwesomeIcon className={styles.icon} icon={faCircleUser} size="2x" onClick={() => setUserNavOpen(!userNavOpen)} alt="UserImage" />
                    {userNavOpen && <UserNav data={setIsLogin} />}
                    <FontAwesomeIcon className={styles.btnHeaderBars} icon={faBars} size="2x" />
                </div>
            </div>
        )
    }


    return (

        <>
            <div id={styles.header} >
                {/* {console.log(isLogin)} */}
                <div className={styles.List_menu}>
                    <NavLink className={styles.logo} to="/Hoc-code-UI">
                        <img src={companyLogo} alt="Logo" />
                    </NavLink>
                    <div className={styles.navbar} >
                        {menuItem.map((menu, index) => (
                            <NavLink to={menu.path} className={(navdata) => (navdata.isActive ? styles.Menu_item_active :styles.Menu_item) } key={index}>
                                <p >{menu.name}</p>
                            </NavLink>
                        ))}
                        {/* <div className={styles.Menu_item}>
                            <NavLink to="/practice" >Luyện tập</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/theory" >Lý thuyết</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/room" >Phòng học</NavLink>
                        </div> */}
                    </div>

                </div>
                <div id={styles.button}>
                    <div className={styles.btn_} id="btnLogIn" onClick={() => setModalOpen(true)} >ĐĂNG NHẬP</div>
                    <FontAwesomeIcon className={styles.btnHeaderBars} icon={faBars} onClick={showSideBar} />
                </div>

                <div className={headerNavBar ? styles.headerNavBars_active : styles.headerNavBars}>
                    <FontAwesomeIcon className={styles.icon} icon={faXmark} size='2x' onClick={showSideBar} />
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} className={(navdata) => (navdata.isActive ? styles.navItem_active : styles.navItem)} key={index}>
                            <p className={styles.nameNavItem}  >{item.name}</p>
                            <div className={styles.line}></div>
                        </NavLink>
                    ))}
                </div>
                {modalopen && <Backdrop onClick={() => setModalOpen(false)} />}
                {modalopen && <Login />}
            </div>

        </>

    )
}

export default Header;
