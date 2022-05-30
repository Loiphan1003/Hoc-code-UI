import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { auth } from './firebase/config';
import LoginSlice from "./redux/loginSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import Content from './components/content/Content';
import Home from './components/home/Home';
import Learn from './components/learnings/Learning';
import CreateTest from './features/classRoom/createTest/CreateTest';
import CodeUi from './features/frameCode/CodeUi';
import Theory from './components/theory/Theory';
import CouresDetail from './features/coureDetail/CouresDetail';
import CouresDetailSection from './features/coureDetail/coures/CouresDetailSection';
import ClassRoom from './features/classRoom/ClassRoom';
import Practice from './features/practice/Practice';
import RoomDetail from './features/classRoom/RoomDetail';
import Exercise from './features/exercise/Exercise';
import CreateBTCode from './features/exercise/createBTCode/index';
import CreateBTLuyenTap from './features/exercise/createBTLuyenTap/index';
import MultipleChoiceExercises from './features/exercise/multipleChoiceExercises/MultipleChoiceExercises';
import CourseWorkDetail from './features/classRoom/courseworkDetail/CourseWorkDetail';
import ExerciseClassRoom from './features/classRoom/courseworkDetail/ExerciseClassRoom';
import UserIformation from './features/userInfomation/UserInformation';
import HomeMainAdmin from './features/AdminHome/HomeMainAdmin';
import QuanLyUser from './features/AdminHome/QuanLyUser';
import QuanLyGV from './features/AdminHome/QuanLyGV';
import Test from './features/test/Test';
import LoginAdmin from './components/Login/LoginAdmin';
import HomeAdmin from './layouts/layoutAdmin';
import DefaultLayout from './layouts/defaultLayout';
import LayoutCreate from './layouts/layoutCreate';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                dispatch(LoginSlice.actions.login({
                    isLogin: true
                }))
            }
        })
    }, [dispatch])

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route exac path='/Hoc-code-UI' element={
                        <DefaultLayout >
                            <Content />
                        </DefaultLayout>}
                    />
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
                    <Route path='/room/create' element={<CreateTest />} />
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
                    <Route path='/exercise/multiplechoice' element={
                        <LayoutCreate>
                            <MultipleChoiceExercises />
                        </LayoutCreate>}
                    />
                    <Route path='/exercise/multiplechoice/edit:exerciseId' element={
                        <LayoutCreate>
                            <MultipleChoiceExercises />
                        </LayoutCreate>}
                    />

                    <Route path='/practice/code/:id' element={<CodeUi />} />
                    <Route path='/admin' element={<LoginAdmin />} />
                    <Route path='/courseworkdetail/:couredetailsName' element={<CourseWorkDetail />} />
                    <Route path='/assignment/:couredetailsName' element={<ExerciseClassRoom />} />
                    <Route path='/test' element={<Test />} />

                    <Route path='/admin/home' element={
                        <HomeAdmin>
                            <HomeMainAdmin />
                        </HomeAdmin>}
                    />
                    <Route path='/Admin/Quanlyuser' element={
                        <HomeAdmin>
                            <QuanLyUser />
                        </HomeAdmin>}
                    />
                    <Route path='/Admin/Quanlygv' element={
                        <HomeAdmin>
                            <QuanLyGV />
                        </HomeAdmin>}
                    />
                    <Route path='/user/information' element={
                        <DefaultLayout>
                            <UserIformation />
                        </DefaultLayout>}
                    />
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
