import React from "react";
import { useState } from "react";

import "./Learn.css"
import Header from "../header/Header";
import Footer from "../footer/Footer";
function Learn(props) {

    const [name, setName] = useState('')

    const handerSearch = () => (
        alert(`Giá trị vừa nhập: ${name}`)
    )


    return (
        <>
            <Header data={props.data}/>
            <div className='learnContent'>
                <div className='find'>
                    <h2>Tự học lập trình trực tuyến. Hãy bắt đầu với khoá học đầu tiên của bạn!</h2>
                    <div className='searchCourse'>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập nội dung tìm kiếm" />
                        <p onClick={handerSearch} />
                    </div>
                </div>

                <div className='mainContent'>
                    {/* <TestSlide/> */}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Learn