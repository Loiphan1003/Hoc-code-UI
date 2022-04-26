import { NavLink } from "react-router-dom";
import React, { useState, useEffect, memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import  {faBell, faCircleUser} from "@fortawesome/free-regular-svg-icons";
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
    // const [dataUser, setDataUser] = useState('');

    useEffect(() => {
        // const checkLogin = ()=>{
        if (data !== '') {
            setIsLogin(true);
            return;
        }

        setIsLogin(false);
        // }
        // return () => checkLogin();
    }, [data])

    // console.log("HeaderData: ", data);

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
        <div id={styles.header} >
            {/* {console.log(isLogin)} */}
            <div className={styles.List_menu}>
                <NavLink className={styles.logo} to="/Hoc-code-UI">
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
                </div>

            </div>
            <div id={styles.button}>
                <div className={styles.btn_} id="btnLogIn" onClick={() => setModalOpen(true)} >ĐĂNG NHẬP</div>
                <FontAwesomeIcon className={styles.btnHeaderBars} icon={faBars} />
            </div>

            {modalopen && <Backdrop onClick={() => setModalOpen(false)} />}
            {modalopen && <Login />}
        </div>
    )
}

export default memo(Header);
