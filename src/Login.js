import React from "react";
import "./Login.css"

import left_Img from '../src/assets/img/main-screen.png'


function Login() {

    return (
        <div className="Content">

            <img className="Left-side" src={left_Img} alt="hinh anh 1" />
            <div className="Right-side">
                <div className="Login-side">
                    <h2>Bắt đầu ngay</h2>
                    <div className="Input">
                        <input className="input-name" placeholder="Tên đăng nhập">
                        </input>
                        <input className="input-email" placeholder="Email">
                        </input>
                        <input className="input-password" type="password" placeholder="Mật khẩu">
                        </input>
                    </div>

                    <div className="Checkbox-Accept">
                        <input className="Checkbox" type="checkbox" placeholder="CheckBox"></input>
                        <p className="Accept">Đồng ý với điều khoản của CodeLearn</p>
                    </div>

                    <button className="btn-Register">Đăng ký</button>
                    <p className="label-2">hoặc sử dụng tài khoản khác</p>

                    <div className="Login-Account">
                        <div className="Microsoft-Account">
                        </div>
                        <div className="Facebook-Account">
                        </div>
                        <div className="Google-Account">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;