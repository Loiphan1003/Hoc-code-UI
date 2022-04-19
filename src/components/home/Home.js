import React from 'react'
// import { useEffect } from 'react';
import './Home.css'
import Header from '../header/Header';
import Footer from '../footer/Footer';
// import {AuthContext} from './context/AuthProvider'

// const courseList = ['Khóa học gợi ý', 'Đang học', 'Đã hoàn thành'];

function Home(props) {

    // const [type, setType] = useState('Khóa học gợi ý');
    // useEffect(() =>{
    // const {user: {displayName, photoURL, uid}} = React.useContext(AuthContext);

    // console.log("Data: ", {displayName, photoURL, uid});
    // },[])



    return (

        <div>
            <Header data={props.data}/>
            <div className="contentHome">

                <div className="information">
                    <p>Xin chào . Chào mừng  đến với CodeLearn. Hãy khám phá nhé!</p>
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
            <Footer/>
        </div>
    )
}

export default Home