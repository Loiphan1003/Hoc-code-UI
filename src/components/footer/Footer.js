import React from "react";
import { NavLink } from "react-router-dom";
import styles from"./Footer.module.css";
import companyLogo from '../../images/logo_transparent.png';
import facebookLogo from '../../images/facebook.png';
import twitterLogo from '../../images/twitter.png';
import instagramLogo from '../../images/instagram.png';
import youtubeLogo from '../../images/youtube.png'


function Footer() {
    return (
        <div className={styles.Footer}>

            <div className={styles.Logo_Footer}>
                <img src={companyLogo} alt="Logo" />
                <ul className={styles.SocialNetwork}>

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

            <div className={styles.Right_footer}>

                <div className="Links">
                    <h3>Liên kết</h3>
                    <ul className={styles.List}>
                        <li><NavLink to="/learning">Học tập</NavLink></li>
                        <li><a href="index.js">Luyện tập</a></li>
                        <li><a href="index.js">Cuộc thi</a></li>
                        <li><a href="index.js">Trò chơi</a></li>
                    </ul>
                </div>

                <div className="Information">
                    <h3>Thông tin</h3>
                    <ul className={styles.List}>
                        <li><a href="index.js">Chia sẻ</a></li>
                        <li><a href="index.js">về chúng tôi</a></li>
                        <li><a href="index.js">Điều khoản sử dụng</a></li>
                    </ul>
                </div>

                <div className="Help">
                    <h3>Trợ giúp</h3>
                    <ul className={styles.List}>
                        <li><a href="index.js">Hỗ trợ</a></li>
                        <li><a href="index.js">Thảo luận</a></li>
                        <li><a href="index.js">Liên hệ với chúng tôi</a></li>
                    </ul>

                </div>
            </div>



        </div>

    )
}

export default Footer;