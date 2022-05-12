import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';

import Content from './components/content/Content';
import Home from './components/home/Home';
import Learn from './components/learnings/Learning';
import CreateCourseWork from './features/classRoom/createCourseWork/CreateCourseWork';
import CodeUi from './features/frameCode/CodeUi';
import Theory from './components/theory/Theory';
import CouresDetail from './features/coureDetail/CouresDetail';
import CouresDetailSection from './features/coureDetail/coures/CouresDetailSection';
import ClassRoom from './features/classRoom/ClassRoom';
import Practice from './features/practice/Practice';
import RoomDetail from './features/classRoom/RoomDetail';
import CourseWorkDetail from './features/classRoom/courseWorkDetail/CourseWorkDetail';
import LoginAdmin from './admin/LoginAdmin'


function App() {


    const [dataUser, setDataUser] = useState('');

    useEffect(() => {
        const login = auth.onAuthStateChanged((user) => {
            if (user) {

                const { displayName, email, uid, photoURL, providerId, Provider } = user;
                setDataUser({ displayName, email, uid, photoURL, providerId, Provider });
                localStorage.setItem("User", uid);
                return;
            }
            
            setDataUser('');
        });
        return () =>{
            login();
        }
    }, [])


    return (
        <div>
            <Router>
                {/* <Header data={dataUser}/> */}
                <Routes>
                    <Route exac path='/Hoc-code-UI' element={<Content data={dataUser} />} />
                    <Route path='/home' element={<Home data={dataUser} />} />
                    <Route path='/learning' element={<Learn data={dataUser} />} />
                    <Route path='/theory' element={<Theory data={dataUser} />} />
                    <Route path="/theory/coureDetail/:courseID" element={<CouresDetail data={dataUser} />} />
                    <Route path='/couredetail/section' element={<CouresDetailSection data={dataUser} />} />
                    <Route path='/room' element={<ClassRoom data={dataUser} />} />
                    <Route path='/room/:roomName' element={<RoomDetail data={dataUser} />} />
                    <Route path='/courseworkdetail/:couredetailsName' element={<CourseWorkDetail data={dataUser}/>} />
                    <Route path='/room/:roomName/create' element={<CreateCourseWork />} />
                    <Route path='/practice' element={<Practice data={dataUser} />} />
                    <Route path='/practice/code' element={<CodeUi />} />
                    <Route path='/practice/code' element={<CodeUi />} />
                    <Route path='/admin' element={<LoginAdmin/>} />
                </Routes>
                {/* <Footer/> */}
            </Router>
        </div>
    )
}

export default App
