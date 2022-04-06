import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Login from './Login';
import Home from './Home';
import Learn from './Learn'
import CodeUi from './CodeUi';
import Footer from './components/Footer';


function App() {
    return (
        <div>
            <Header />

            {/* <Content /> */}
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/learning" element={<Learn />} />
                <Route path="/code" element={<CodeUi />} />

            </Routes>

            <Footer />
        </div>
    )
}

export default App
