import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';

import Content from './components/content/Content';
import Home from './components/home/Home';
import Learn from './components/learnings/Learning';
// import Code from './components/code/Code';
import Theory from './components/theory/Theory';
import CouresDetail from './features/coureDetail/CouresDetail';
import CouresDetailSection from './features/coureDetail/coures/CouresDetailSection';



function App() {

    const [dataUser, setDataUser] = useState('');


    useEffect(() => {
        const login = auth.onAuthStateChanged((user) => {
            if (user) {

                const { displayName, email, uid, photoURL, providerId, Provider } = user;
                setDataUser({ displayName, email, uid, photoURL, providerId, Provider });
                // console.log("User ", user);
                // (true);
                // props.state(true);
                localStorage.setItem("User", uid);
                return;
            }
            setDataUser('');
        });
        return () => {
            login();
        }
    }, [])

    console.log("Data: ", dataUser);

    return (
        <div>
            <Router>
                {/* <Header data={dataUser}/> */}
                <Routes>
                    <Route path="/" element={<Content data={dataUser} />} />
                    <Route path='/home' element={<Home data={dataUser} />} />
                    <Route path='/learning' element={<Learn data={dataUser} />} />
                    {/* <Route path='/code' element={<Code/>} /> */}
                    <Route path='/theory' element={<Theory data={dataUser} />} />
                    <Route path='/couredetail' element={<CouresDetail data={dataUser}/>} />
                    <Route path='/couredetail/section' element={<CouresDetailSection data={dataUser}/>} />

                </Routes>
                {/* <Footer/> */}
            </Router>
        </div>
    )
}

export default App
