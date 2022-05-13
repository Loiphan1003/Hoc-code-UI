import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { auth } from './firebase/config';

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
import Exercise from './features/exercise/Exercise';
import CreateExercise from './features/exercise/createExercise/CreateExercise';
import MultipleChoiceExercises from './features/exercise/multipleChoiceExercises/MultipleChoiceExercises';
import CourseWorkDetail from './features/classRoom/courseworkDetail/CourseWorkDetail';
import ExerciseClassRoom from './features/classRoom/courseworkDetail/ExerciseClassRoom';
import LoginAdmin from './components/Login/LoginAdmin';
import DefaultLayout from './layouts/defaultLayout';
import LayoutCreate from './layouts/layoutCreate';

function App() {


    return (
        <div>
            <Router>
                <Routes>
                    <Route exac path='/Hoc-code-UI' element={
                        <DefaultLayout >
                            <Content  />
                        </DefaultLayout>}
                    />
                    <Route path='/home' element={
                        <DefaultLayout >
                            <Home  />
                        </DefaultLayout>}
                    />
                    <Route path='/learning' element={<Learn  />} />
                    <Route path='/theory' element={
                        <DefaultLayout>
                            <Theory  />
                        </DefaultLayout>}
                    />
                    <Route path="/theory/coureDetail/:courseID" element={
                        <DefaultLayout>
                            <CouresDetail  />
                        </DefaultLayout>}
                    />
                    <Route path='/couredetail/section/:idLyThuyet' element={<CouresDetailSection  />} />
                    <Route path='/room' element={
                        <DefaultLayout>
                            <ClassRoom  />
                        </DefaultLayout>}
                    />
                    <Route path='/room/:roomId' element={<RoomDetail  />} />
                    <Route path='/room/:roomId/create' element={<CreateCourseWork />} />
                    <Route path='/practice' element={
                        <DefaultLayout>
                            <Practice  />
                        </DefaultLayout>}
                    />
                    <Route path='/exercise' element={
                        <DefaultLayout>
                            <Exercise  />
                        </DefaultLayout>}
                    />
                    <Route path='/exercise/create' element={
                        <LayoutCreate>
                            <CreateExercise  />
                        </LayoutCreate>}
                    />
                    <Route path='/exercise/multiplechoice' element={
                        <LayoutCreate>
                            <MultipleChoiceExercises />
                        </LayoutCreate>}
                    />

                    <Route path='/practice/code/:id' element={<CodeUi />} />
                    <Route path='/admin' element={<LoginAdmin />} />
                    <Route path='/courseworkdetail/:couredetailsName' element={<CourseWorkDetail />} />
                    <Route path='/assignment/:couredetailsName' element={<ExerciseClassRoom />} />
                    
                </Routes>
            </Router>
        </div>
    )
}

export default App
