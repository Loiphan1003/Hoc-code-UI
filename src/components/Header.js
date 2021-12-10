import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/style/Header.css"
import companyLogo from '../assets/img/codelearn-logo.png'

function header() {

    return (
        <div id="header" >
            <NavLink className="logo" to="/Hoc-code-UI">
                <img src={companyLogo} alt="Logo" />
            </NavLink>
            <ul className="List-menu">

                <li>
                    <NavLink to="/learning" className="a">Học tập</NavLink>
                </li>

                <li>
                    <NavLink to="/" className="a">Luyện tập</NavLink>
                </li>

                <li>
                    <NavLink to="/" className="a">Thi đấu</NavLink>
                </li>
                
                <li>
                    <NavLink to="/" className="a">Thử thách</NavLink>
                </li>
            </ul>
            <div className="button">
                <button className="btn_Login">Đăng nhập</button>
                <button className="btn_Register">Đăng ký</button>
            </div>


        </div>
    )
}

export default header;
