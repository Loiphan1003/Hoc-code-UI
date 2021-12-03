import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/style/Header.css"

function header() {

    return (
        <div id="header" >
            <NavLink className="logo" to="/">
                        <img className="img-logo" src="../codelearn-logo.png" alt="Logo" />
                    </NavLink>
            <ul className="List-menu">
                
                <li>
                    <NavLink to="/learning" className="a">Học tập</NavLink>
                </li>
                {/* <a className="Training" href="index.js">Training</a>
                <a className="Fights" href="index.js">Fights</a>
                <a className="Challenge" href="index.js">Challenge</a>
                <a className="Evaluating" href="index.js">Evaluating</a>
                <a className="Discussion" href="index.js">Discussion</a>
                <a className="Game" href="index.js">Game</a> */}
            </ul>
            <div className="button">
                <button className="Login">Login</button>
                <button className="Register">Register</button>
            </div>


        </div>
    )
}

export default header;
