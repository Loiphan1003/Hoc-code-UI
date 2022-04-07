import { NavLink, Route } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { useState } from 'react';
import "../assets/style/Header.css"
import companyLogo from '../assets/img/logo_transparent.png'
import Content from "../Content";




function Header(props) {
   

    // const [show, setShow] = useState(false)

    const logoutAccount = () => {
        firebase.auth().signOut();
        alert("Đăng xuất thành công");
        return(
            <Route path="/Hoc-code-UI" element={<Content />} />
        )
    }

    
    const isLogin = props.Check;
    console.log(isLogin)
    if (!isLogin) {
        return (
            <div id="header" >

                <NavLink className="logo" to="/Hoc-code-UI">
                    <img src={companyLogo} alt="Logo" />
                </NavLink>
                <div className="List-menu">
                    <div className="Menu-item active">
                        <NavLink to="/learning">Học tập</NavLink>
                    </div>

                    <div className="Menu-item">
                        <NavLink to="/" >Luyện tập</NavLink>
                    </div>

                    <div className="Menu-item">
                        <NavLink to="/" className="a">Thi đấu</NavLink>
                    </div>

                    <div className="Menu-item">
                        <NavLink to="/" className="a">Thử thách</NavLink>
                    </div>

                    <div className="Line"></div>
                </div>
                <div id="button">
                    <NavLink to='/login' className="btn_">ĐĂNG NHẬP</NavLink>
                    <button className="btn_">Đăng ký</button>
                </div>
            </div>
        )
    }

    return (
        <div id="header" >

            <NavLink className="logo" to="/Hoc-code-UI">
                <img src={companyLogo} alt="Logo" />
            </NavLink>
            <div className="List-menu">
                <div className="Menu-item active">
                    <NavLink to="/learning">Học tập</NavLink>
                </div>

                <div className="Menu-item">
                    <NavLink to="/" >Luyện tập</NavLink>
                </div>

                <div className="Menu-item">
                    <NavLink to="/" className="a">Thi đấu</NavLink>
                </div>

                <div className="Menu-item">
                    <NavLink to="/" className="a">Thử thách</NavLink>
                </div>

                <div className="Line"></div>
            </div>
            <div id="button">
                <button className="btn_" onClick={() => logoutAccount()} >ĐĂNG Xuất</button>
            </div>
        </div>

    )
}

export default Header;
