import { NavLink } from "react-router-dom";
// import 'firebase/compat/auth';
import React, { useState, useEffect, memo } from 'react';
// import firebase from "firebase/compat/app";
import styles from "./Header.module.css";
import companyLogo from '../../images/logo_transparent.png';
import Login from '../Login/Login';
import UserNav from "./UserNav";
import Backdrop from '../Backdrop';
// import { AuthContext } from '../context/AuthProvider';
// import { checkLogin } from "../Redux/selectors";
// import {useSelector} from "react-redux"
// import { uniqueDirs } from "gh-pages/lib/util";


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

    console.log("HeaderData: ", data);

    if (isLogin === true) {
        return (
            <div id={styles.header} >
                <div className={styles.List_menu}>
                    <NavLink className={styles.logo} to="/home">
                        <img src={companyLogo} alt="Logo" />
                    </NavLink>

                    <div className={styles.navbar} >
                        <div className={styles.Menu_item}>
                            <NavLink to="/learning">Học tập</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/" >Luyện tập</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/theory" >Lý thuyết</NavLink>
                        </div>

                        <div className={styles.Menu_item}>
                            <NavLink to="/" >Phòng học</NavLink>
                        </div>
                        <div className="animation-click"></div>
                    </div>
                </div>
                <div id={styles.button_logout} >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABvElEQVRoge2ZP07DMBSHP6jEAlwA6IxEOQVdmNiAnbGiIMQFOpY7AANiKZyAgVOUFSEhURb+FEQHqrYwJEjUTtw4seNG8ie9oUn8e7+XviSOAx6PxwZzwAnQAZ6AZritMDSBHyGaTh1p0kEu4NlGohkbogSGc8lXMqy3BOwBmzH7u8Aj8GU4b2ZWgHNggNw6YgyAs3DMVLAFvDPZuBifwLYDv2McACP0zf/FCKjn7jpkl2jzbeAQqADzYVTCbe2I44fATs7eWUZum2+gBswqxpWA/fDY/2PfCG4AuXGJbH5DY3wVuYgLwx5jKQN9IXkthU5d0OiT053pGLnn0zxPSsCdoHWkK6Lq1ziqwu9TggtRlyHB80ClbYUHxs/aWgatdUHrPrO7BPSEpAsZtBYFrZ6uQJrJlThRyzpBy6SX5hqYKnwBrvEFuMYX4BpfgGt8Aa7RLaBhxcU41pYgG8gv5F0Dut0IXeMnKsq87TD2T7gwn7iIJHNvcb6eN0qPhb8L2eCa+JZoOfSVGNVC76vpZDZaSLVGZPp7hJUCbhX7bizkM84qwWKt2D4vTNFHjUmUgSvgI4wWBTLv8RSJX9LQ6VqrOGHkAAAAAElFTkSuQmCC" alt="notifi"/>
                    <img src="https://img.icons8.com/material-outlined/48/000000/user-male-circle.png"  onClick={() => setUserNavOpen(!userNavOpen)} alt="UserImage" />
                    {userNavOpen && <UserNav data={setIsLogin} />}
                </div>
            </div>
        )
    }


    return (
        <div id={styles.header} >
            {/* {console.log(isLogin)} */}
            <div className={styles.List_menu}>
                <NavLink className={styles.logo} to="/">
                    <img src={companyLogo} alt="Logo" />
                </NavLink>
                <div className={styles.navbar} >
                    <div className={styles.Menu_item}>
                        <NavLink to="/learning">Học tập</NavLink>
                    </div>

                    <div className={styles.Menu_item}>
                        <NavLink to="/" >Luyện tập</NavLink>
                    </div>

                    <div className={styles.Menu_item}>
                        <NavLink to="/theory" >Lý thuyết</NavLink>
                    </div>

                    <div className={styles.Menu_item}>
                        <NavLink to="/" >Phòng học</NavLink>
                    </div>
                    <div className="animation-click"></div>
                </div>

            </div>
            <div id={styles.button}>
                <div to='/login' className={styles.btn_} id="btnLogIn" onClick={() => setModalOpen(true)} >ĐĂNG NHẬP</div>
                {/* <div className="btn_">Đăng ký</div> */}
            </div>
            {modalopen && <Backdrop onClick={() => setModalOpen(false)} />}
            {modalopen && <Login />}
        </div>
    )
}

export default memo(Header);
