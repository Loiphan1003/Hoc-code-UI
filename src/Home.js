import React from 'react'
// import { useState } from 'react';
import './Home.css'

// const courseList = ['Khóa học gợi ý', 'Đang học', 'Đã hoàn thành'];

function Home() {

    // const [type, setType] = useState('Khóa học gợi ý');

    // console.log(type);


    return (
        <div className="contentHome">

            <div className="information">
                <p>Xin chào Loiphan. Chào mừng bạn đến với CodeLearn. Hãy khám phá nhé!</p>
                <div className="information-account">
                </div>
            </div>

            <div className="course">
                <h2>Khóa học</h2>
                {/* <div className="menu">
                    {courseList.map(courseList => (
                        <h3
                            key={courseList}
                            onClick={() => setType(courseList)}
                        >
                            {courseList}
                        </h3>
                    ))}
                </div> */}
            </div>

        </div>
    )
}

export default Home