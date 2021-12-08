import React from "react";
import "../assets/style/Footer.css"
import companyLogo from '../assets/img/codelearn-logo.png'


function Footer() {
    return (
        <div className="Footer">

            <div className="Logo-Footer">
                <img src={companyLogo} alt="Logo" />
                <p className="Discription">CodeLearn là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, thực hành, thi đấu và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.</p>
                <div className="SocialNetwork">
                    <a href='/learning' aria-label="Trang facebook">
                        <p className="Facebook-logo" />
                    </a>
                    <a href='/' aria-label="Trang instagram">
                        <p className="Instagram-Logo" />
                    </a>
                    <a href='/' aria-label="Trang Twitter">
                        <p className="Twitter-Logo" />
                    </a>
                    <a href='/' aria-label="Trang youtube">
                        <p className="Youtube-Logo" />
                    </a>
                </div>
            </div>

            <div className="Links">
                <p>Liên kết</p>
                <ul className="List">
                    <li><a href="index.js">Học tập</a></li>
                    <li><a href="index.js">Luyện tập</a></li>
                    <li><a href="index.js">Cuộc thi</a></li>
                    <li><a href="index.js">Trò chơi</a></li>
                </ul>
            </div>

            <div className="Information">
                <p>Thông tin</p>
                <ul className="List">
                    <li><a href="index.js">Chia sẻ</a></li>
                    <li><a href="index.js">về chúng tôi</a></li>
                    <li><a href="index.js">Điều khoản sử dụng</a></li>
                </ul>
            </div>

            <div className="Help">
                <p>Trợ giúp</p>
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