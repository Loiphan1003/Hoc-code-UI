import { NavLink } from "react-router-dom";
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import companyLogo from '../../images/logo_transparent.png';
import UserNav from "./UserNav";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Avatar from '@mui/material/Avatar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useStateIfMounted } from "use-state-if-mounted";


function Header(props) {
    const [headerNavBar, setHeaderNavbar] = useStateIfMounted(false);
    const [dataUser, setDataUser] = useStateIfMounted(null);
    const [popUp,setPopUp] = useStateIfMounted(false);
    const showSideBar = () => setHeaderNavbar(!headerNavBar);
    const showPopUp = () => setPopUp(!popUp);
    
    const auth = getAuth();
    const linkAvatar = JSON.parse(localStorage.getItem('linkAvatar')); 
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            setDataUser(user)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const menuItem = [
        {
            path: "/home",
            name: "Trang chủ",
        },
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
        {
            path: "/aaa",
            name: "Trợ giúp",
        }
    ]

    return (
            <div id={styles.header} >
                <div className={styles.List_menu}>
                    <NavLink className={styles.logo} to="/home">
                        <img src={companyLogo} alt="Logo" />
                    </NavLink>

                    <div className={styles.navbar} >
                        {menuItem.map((menu, index) => (
                            <NavLink to={menu.path} className={(navdata) => (navdata.isActive ? styles.Menu_item_active :styles.Menu_item) } key={index}>
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
                                            src={!!linkAvatar ? window.atob(linkAvatar) : dataUser.photoURL} onClick={showPopUp} 
                                            sx={{
                                                cursor:"pointer",
                                                width:"32px",
                                                height:"32px",
                                                border:"solid 0.1px rgb(190 169 169)",
                                                marginRight: "15px"
                                            }}
                                            >
                                                D
                                            </Avatar>
                                        </div>
                                </HeadlessTippy>
                            </div>
                            <FontAwesomeIcon className={styles.btnHeaderBars} icon={faBars} onClick={showSideBar}/>
                        </div>
                    ) 
                }
                <div className={headerNavBar ? styles.headerNavBars_active : styles.headerNavBars}>
                    <FontAwesomeIcon className={styles.icon} icon={faXmark} size='2x' onClick={showSideBar} />
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} className={(navdata) => (navdata.isActive ? styles.navItem_active : styles.navItem)} key={index}>
                            <p className={styles.nameNavItem}  >{item.name}</p>
                            <div className={styles.line}></div>
                        </NavLink>
                    ))}
                </div>
            </div>
        )
}

export default Header;
