import React from "react";
import { NavLink } from "react-router-dom";

import "../assets/style/Footer.css"

import companyLogo from '../assets/img/codelearn-logo.png'
import facebookLogo from '../assets/img/facebook.png'
import twitterLogo from '../assets/img/twitter.png'
import instagramLogo from '../assets/img/instagram.png'
import youtubeLogo from '../assets/img/youtube.png'


function Footer() {
    return (
        <div className="Footer">

            <div className="Logo-Footer">
                <img src={companyLogo} alt="Logo" />
                <p className="Discription">CodeLearn là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, thực hành, thi đấu và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.</p>
                <ul className="SocialNetwork">

                    <li>
                        <a href='/learning' aria-label="Trang facebook">
                            <img className="Facebook-logo" src={facebookLogo} alt="Facebook" />
                        </a>
                    </li>

                    <li>
                        <a href='/' aria-label="Trang instagram">
                            <img className="Instagram-Logo" src={instagramLogo} alt="Instagram" />
                        </a>
                    </li>

                    <li>
                        <a href='/' aria-label="Trang Twitter">
                            <img className="Twitter-Logo" src={twitterLogo} alt="Twitter" />
                        </a>
                    </li>

                    <li>
                        <a href='/' aria-label="Trang youtube">
                            <img className="Youtube-Logo" src={youtubeLogo} alt="Youtube" />
                        </a>
                    </li>

                </ul>
            </div>

            <div className="Links">
                <h3>Liên kết</h3>
                <ul className="List">
                    <li><NavLink to="/learning">Học tập</NavLink></li>
                    <li><a href="index.js">Luyện tập</a></li>
                    <li><a href="index.js">Cuộc thi</a></li>
                    <li><a href="index.js">Trò chơi</a></li>
                </ul>
            </div>

            <div className="Information">
                <h3>Thông tin</h3>
                <ul className="List">
                    <li><a href="index.js">Chia sẻ</a></li>
                    <li><a href="index.js">về chúng tôi</a></li>
                    <li><a href="index.js">Điều khoản sử dụng</a></li>
                </ul>
            </div>

            <div className="Help">
                <h3>Trợ giúp</h3>
                <ul className="List">
                    <li><a href="index.js">Hỗ trợ</a></li>
                    <li><a href="index.js">Thảo luận</a></li>
                    <li><a href="index.js">Liên hệ với chúng tôi</a></li>
                </ul>

            </div>

        </div>

    )
}

export default Footer;