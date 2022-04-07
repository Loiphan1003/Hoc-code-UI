import React, { Suspense, useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Header from './components/Header';
import Content from './Content';
import Home from './Home';
import Learn from './Learn'
import CodeUi from './CodeUi';
import Footer from './components/Footer';
import Modal from './components/Modal';




function App() {

    const [login, isLogin] = useState();

    // Configure Firebase.s
    const config = {
        apiKey: 'AIzaSyAZhqU_BcQdWBJGUlcbP_uvDDbuaEaAW0o',
        authDomain: 'hoc-code-1c31e.firebaseapp.com',
    };
    // if(!firebase.initializeApp(config)){
    firebase.initializeApp(config);
    // }
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                console.log("Not log in");
                isLogin(false);
                return;
            }
            console.log("Log in");
            console.log("User name: ", user.displayName);
            const token = await user.getIdToken();
            console.log("User token: ", token);
            isLogin(true);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <div>
            <Suspense fallback={<div>Loading ...</div>}>
                <BrowserRouter>
                    <Header Check={login} />
                    {/* {console.log(text)} */}
                    {/* <Content /> */}
                    <Routes>
                        <Route exact path="/Hoc-code-UI" element={<Content/>} to="/home" />
                        <Route path='/login' element={<Modal/>}/>
                        <Route path="/home" element={<Home />} />
                        <Route path="/learning" element={<Learn />} />
                        <Route path="/code" element={<CodeUi />} />

                    </Routes>
                    <Footer />
                </BrowserRouter>
            </Suspense>
        </div>
    )
}

export default App
