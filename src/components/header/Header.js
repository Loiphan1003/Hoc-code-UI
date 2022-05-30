import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "./Header.module.css";
import { auth } from '../../firebase/config';
import HeadlessTippy from "@tippyjs/react/headless";
import Avatar from '@mui/material/Avatar';
import companyLogo from '../../images/logo_transparent.png';
import Login from '../Login/Login';
import UserNav from "./UserNav";
import Backdrop from '../Backdrop';
import Tippy from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css';


function Header(props) {


    const [modalopen, setModalOpen] = useState(false);
    const [headerNavBar, setHeaderNavbar] = useState(false);
    const showSideBar = () => setHeaderNavbar(!headerNavBar);
    const showPopUp = () => setPopUp(!popUp);
    const [popUp, setPopUp] = useState(false);

    const [dataUser, setDataUser] = useState('');

    useEffect(() => {
        const login = auth.onAuthStateChanged((user) => {
            if (user) {

                const { displayName, email, uid, photoURL, providerId, Provider } = user;
                setDataUser({ displayName, email, uid, photoURL, providerId, Provider });
                localStorage.setItem("User", uid);
                return;
            }

            setDataUser('');
        });
        return () => {
            login();
        }
    }, [])

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

    return (
        <div id={styles.header} >
            <div className={styles.List_menu}>
                <NavLink className={styles.logo} to={dataUser === '' ? '/Hoc-code-UI' : '/home'}>
                    <img src={companyLogo} alt="Logo" />
                </NavLink>

                <div className={styles.navbar} >
                    {menuItem.map((menu, index) => (
                        <NavLink to={menu.path} className={(navdata) => (navdata.isActive ? styles.Menu_item_active : styles.Menu_item)} key={index}>
                            <p >{menu.name}</p>
                        </NavLink>
                    ))}
                </div>

            </div>
            {
                !!dataUser && (
                    <div id={styles.button_logout}  >
                        <div>
                            <HeadlessTippy visible={popUp}
                                interactive
                                render={() => (<UserNav onClick={showPopUp} />)}
                                placement={'bottom-end'}
                                onClickOutside={showPopUp}>
                                <div className={styles.more_btn} >
                                    <Tippy content={<span>Thông báo</span>}>
                                        <button>
                                            <FontAwesomeIcon icon={faBell} className={styles.iNoti}></FontAwesomeIcon>
                                        </button>
                                    </Tippy>

                                    <Avatar alt="Remy Sharp"
                                        src={dataUser.photoURL} onClick={showPopUp}
                                        sx={{
                                            cursor: "pointer",
                                            width: "32px",
                                            height: "32px",
                                            border: "solid 0.1px rgb(190 169 169)",
                                            marginRight: "15px"
                                        }}
                                    >
                                        D
                                    </Avatar>
                                </div>
                            </HeadlessTippy>
                        </div>
                        <FontAwesomeIcon className={styles.btnHeaderBars} icon={faBars} onClick={showSideBar} />
                    </div>
                )
            }
            {modalopen && <Backdrop onClick={() => setModalOpen(false)} />}
            {modalopen && <Login />}
        </div>
    )
}

export default Header;
