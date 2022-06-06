import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Content from './components/content/Content';
import Home from './components/home/Home';
import Learn from './components/learnings/Learning';
import CreateTest from './features/classRoom/createTest/CreateTest';
import CodeUi from './features/frameCode/CodeUi';
import Theory from './features/coures/Theory';
import CouresDetail from './features/coures/CouresDetail';
import CouresDetailSection from './features/coures/CouresDetailSection';
import ClassRoom from './features/classRoom/ClassRoom';
import Practice from './features/practice/Practice';
import RoomDetail from './features/classRoom/RoomDetail';
import Exercise from './features/exercise/Exercise';
import CreateBTCode from './features/exercise/createBTCode';
import CreateBTLuyenTap from './features/exercise/createBTLuyenTap';
import MultipleChoiceExercises from './features/exercise/multipleChoiceExercises/MultipleChoiceExercises';
import DefaultLayout from './layouts/defaultLayout';
import LayoutCreate from './layouts/layoutCreate';
import Test from './features/test/Test';
import UseInfomation from './features/userInfomation/UserInformation';
import AdminHome from './features/admin/HomeMainAdmin';
import LoginAdmin from './components/Login/LoginAdmin.js';
import CreateMonHoc from './features/create/createMonHoc';
import CreateLyThuyet from './features/create/createLyThuyet';
import QuanLyGV from './features/admin/QuanLyGV';
import TestOverview from './features/classRoom/testOverview';
import LayoutAdmin from './layouts/layoutAdmin/index';
import QuanLyNguoiDung from './features/admin/QuanLyUser';
import QuanLyBTCode from './features/admin/QuanlyBTLT';
import QuanLyLT from './features/admin/QuanlyLT';

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/home' element={
                        <DefaultLayout >
                            <Home />
                        </DefaultLayout>}
                    />
                    <Route path='/learning' element={<Learn />} />
                    <Route path='/theory' element={
                        <DefaultLayout>
                            <Theory />
                        </DefaultLayout>}
                    />
                    <Route path="/theory/coureDetail/:courseID" element={
                        <DefaultLayout>
                            <CouresDetail />
                        </DefaultLayout>}
                    />
                    <Route path='/couredetail/section/:idLyThuyet' element={<CouresDetailSection />} />
                    <Route path='/room' element={
                        <DefaultLayout>
                            <ClassRoom />
                        </DefaultLayout>}
                    />
                    <Route path='/room/:roomId' element={<RoomDetail />} />
                    <Route path='/create-test/:idPhong' element={<CreateTest />} />
                    <Route path='/practice' element={
                        <DefaultLayout>
                            <Practice />
                        </DefaultLayout>}
                    />
                    <Route path='/exercise' element={
                        <DefaultLayout>
                            <Exercise />
                        </DefaultLayout>}
                    />
                    <Route path='/exercise/create' element={
                        <LayoutCreate>
                            <CreateBTCode />
                        </LayoutCreate>}
                    />
                    <Route path='/exercise/createLuyenTap' element={
                        <LayoutCreate>
                            <CreateBTLuyenTap />
                        </LayoutCreate>}
                    />
                    <Route path='/exercise/multiplechoice' element={
                        <LayoutCreate>
                            <MultipleChoiceExercises />
                        </LayoutCreate>}
                    />

                    <Route path='/practice/code/:id' element={<CodeUi />} />

                    <Route exact path='/' element={
                        <DefaultLayout >
                            <Content />
                        </DefaultLayout>}
                    />

                    <Route path='/test/:idDeKiemTra' element={<Test />} />

                    <Route path='/createMonHoc' element={<CreateMonHoc />} />
                    <Route path='/createLyThuyet' element={<CreateLyThuyet />} />
                    <Route path='/infomation' element={
                        <DefaultLayout >
                            <UseInfomation />
                        </DefaultLayout>
                    } />
                    <Route path='/test-overview/:idTest' element={<TestOverview />} />

                    {/* Admin */}
                    <Route path='/admin'
                        element={<LoginAdmin />}
                    />

                    <Route
                        path='/admin/home'
                        element={
                            <LayoutAdmin>
                                < AdminHome />
                            </LayoutAdmin>
                        }
                    />

                    <Route
                        path='/Admin/Quanlygv'
                        element={
                            <LayoutAdmin>
                                <QuanLyGV/>
                            </LayoutAdmin>
                        }
                    />

                    <Route
                        path='/Admin/Quanlyuser'
                        element={
                            <LayoutAdmin>
                                <QuanLyNguoiDung/>
                            </LayoutAdmin>
                        }
                    />

                    <Route
                        path='/Admin/Quanlybaitapcode'
                        element={
                            <LayoutAdmin>
                                <QuanLyBTCode/>
                            </LayoutAdmin>
                        }
                    />

                    <Route
                        path='/Admin/Quanlybailythuyet'
                        element={
                            <LayoutAdmin>
                                <QuanLyLT/>
                            </LayoutAdmin>
                        }
                    />
                    <Route path='/QuanLyLT/createLyThuyet/:IdMonHoc/:TenMonHoc' element={
                        <LayoutAdmin>
                            <CreateLyThuyet  />
                        </LayoutAdmin>}
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
