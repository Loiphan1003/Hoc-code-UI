import React from "react";
import "./Content.css"
import Header from "../header/Header";
import Footer from '../footer/Footer';
// import Img_content from '../src/assets/img/Frame-2.png'


function Content(props) {

    console.log("HeaderData: ",props.data);


    return (
        <div>
            <Header data={props.data}/>
            <div className="Content">
                <div className="first-content">

                    <div className="left-content">
                        <h1>Học code cùng CODE ACADEMY</h1>
                        <p>CODE ACADEMY là nền tảng tương tác trực tuyến hỗ trợ người dùng học tập, thực hành, thi đấu và đánh giá kỹ năng lập trình một cách nhanh chóng và chính xác.</p>
                    </div>

                    <div className="right-content">
                    </div>
                </div>

                <div className="seccond-content">
                    <div className="seccond-content-icon">
                        <img src="https://img.icons8.com/color-glass/100/000000/code.png" alt="imageStart" />
                    </div>
                    <h2>Lập trình</h2>
                    <p>Hiện tại trang đang hỗ trợ các ngôn ngữ lập trình như C, C++, javascript, python, java</p>
                </div>

            </div>
            <Footer/>
        </div>


    )
}

export default Content;