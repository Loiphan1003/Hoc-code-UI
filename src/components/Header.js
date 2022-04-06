import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/style/Header.css"
import companyLogo from '../assets/img/logo_transparent.png'
import Backdrop from "./Backdrop";
import Modal from "./Modal";



function Header() {

    const [show, setShow] = useState(false)

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
                <button className="btn_" onClick={() => setShow(true)}>ĐĂNG NHẬP</button>
                <button className="btn_">Đăng ký</button>
            </div> 
            {show && <Backdrop onClick={()=> setShow(false)}/>}
            {show && <Modal />}
        </div>
    )
}

export default Header;
