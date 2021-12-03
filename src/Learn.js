import React from "react";
import { useState } from "react";

import TestSlide from './testSlide';
import "./assets/style/Learn.css"

function Learn() {

    const [name, setName] = useState('')

    const handerSearch = () => (
        alert(`Giá trị vừa nhập: ${name}`)
    )


    return (
        <div className='learnContent'>
            <div className='find'>
                <h2>Tự học lập trình trực tuyến. Hãy bắt đầu với khoá học đầu tiên của bạn!</h2>
                <div className='searchCourse'>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập nội dung tìm kiếm" />
                    <p onClick={handerSearch} />
                </div>
            </div>

            <div className='mainContent'>
                <TestSlide/>
            </div>
        </div>
    )
}

export default Learn