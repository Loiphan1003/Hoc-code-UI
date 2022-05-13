import React, { useState } from 'react';
import styles from './CreateCourseWork.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Radio, Input, Space } from 'antd';
import { faLeftLong, faPlusCircle, faChevronUp, faCode, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
// import { current } from '@reduxjs/toolkit';
// import CreateExercise from '../../exercise/createExercise/CreateExercise';
// import MultipleChoiceExercises from '../../exercise/multipleChoiceExercises/MultipleChoiceExercises';

function CreateCourseWork(props) {

    const [courseName, setCourseName] = useState("");
    const [checked, setChecked] = useState(false);
    const [visibility, setVisibility] = useState('darft');
    // const [timeOpen, setTimeOpen] = useState();
    const [selecQuestion, setSelecQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);

    const handAddQuestion = (value) => {
        if (value === 'code') {
            setQuestions(
                [
                    ...questions,
                    { type: "code", name: "question 1", language: "c" }
                ]
            )
        } else if (value === 'mutiple_question') {
            setQuestions(
                [
                    ...questions,
                    { type: "mutiple_question", name: "question 1", option_1: false, option_2: false, option_3: false, option_4: false, answer: "c" }
                ]
            )
        }
    }

    // console.log("Question: ", questions);

    // const handleAnswer = (event) => {
    //     // console.log(event.target.value);
    // }

    let listQuesion = [];
    const handleSave = () => {
        console.log("Click");
        listQuesion.push(questions)
        // return;

    }

    console.log(visibility);

    return (
        <>
            <div className={styles.header} >
                <div className={styles.header_left} >
                    <div className={styles.btnExit} >
                        <FontAwesomeIcon icon={faLeftLong} />
                        <p>Thoát</p>
                    </div>
                    <h1>{courseName.length > 0 ? courseName : "Tên bài tập"}</h1>
                </div>

                <div className={styles.header_right} onClick={() => handleSave()} >
                    Lưu
                </div>
            </div>

            <div className={styles.content} >

                <div className={styles.main_content} >
                    <input className={styles.course_name} type='text' placeholder='Tên bài tập' onChange={(e) => setCourseName(e.target.value)} />

                    <div className={styles.course_discription} >
                        <h2>Mô tả:</h2>
                        <CKEditor
                            // className={styles.editor}
                            height="500px"
                            editor={ClassicEditor}
                            // data={valueInputAnswer}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "400px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            // onReady={editor => {
                            //     // You can store the "editor" and use when it is needed.
                            //     console.log('Editor is ready to use!', editor);
                            // }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                // setExerciseName(data);
                                // console.log("Change", { event, editor, data });
                            }}
                        // onBlur={(event, editor) => {
                        //     console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     console.log('Focus.', editor);
                        // }}
                        />
                    </div>

                    <div className={styles.course_visibility} >
                        <h2>Hiện thị:</h2>
                        <form>
                            <input type="radio" id='darft' value="darft" onChange={(e => setVisibility(e.target.value))} checked={visibility === 'darft'} />
                            <label htmlFor="darft" >Lưu vào nháp</label> <br />
                            <input type="radio" id='schedule' value="schedule" onChange={(e => setVisibility(e.target.value))} checked={visibility === 'schedule'} />
                            <label htmlFor="schedule" >Phân lịch bài tập</label>
                        </form>
                    </div>

                    {visibility === 'schedule' && <div div >

                        <div>
                            <h2>Cài đặt câu hỏi:</h2>
                            <FormControlLabel
                                value="Cài đặt câu hỏi"
                                control={<Switch color="primary" onChange={() => setChecked(!checked)} />}
                            />
                        </div>

                        <div >
                            <h2>Ngày mở và kết thúc:</h2>
                            <div className={styles.course_date} >
                                <TextField
                                    label="Ngày mở:"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <div className={styles.date_close} >
                                    <TextField
                                        label="Ngày kết thúc:"
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>}


                    <div>
                        {questions.map((question, index) => (
                            <div key={index} className={styles.question_item} >
                                {/* <div className={question.type === 'code' ? styles.question_item_solution : styles.none} > */}
                                {/* <CreateExercise  /> */}
                                {/* </div> */}

                                {/* /\ <div className={question.type === 'mutiple_question' ? styles.question_item_mutiple_active : styles.none} > */}
                                {/* <MultipleChoiceExercises /> */}
                                {/* </div> * */}
                            </div>
                        ))}
                    </div>

                    <div className={styles.add_question} >

                        {selecQuestion && <div className={styles.backdrop} onClick={() => setSelecQuestion(false)} ></div>}
                        {/* {selecQuestion && <div className={styles.nav_question}>
                            <button className={styles.nav_question_item} onClick={() => handAddQuestion("code")} >
                                <FontAwesomeIcon icon={faCode} />
                                <p>Bài tập code</p>
                            </button>

                            <button className={styles.nav_question_item} onClick={() => handAddQuestion("mutiple_question")} >
                                <FontAwesomeIcon icon={faCircleQuestion} />
                                <p>Câu hỏi trắc nghiệm</p>
                            </button>
                        </div>}  */}

                        {selecQuestion && <div className={styles.nav_question}>
                            <h2>Thêm câu hỏi</h2>
                            <input placeholder="Nhập mã bài tập" />
                            <div>
                                <label>Loại bài tập</label><br />
                                <select>
                                    <option>Bài tập code</option>
                                    <option>Bài tập trắc nghiệm</option>
                                </select>
                            </div>

                            <button>Thêm bài tập</button>
                        </div>}

                        <button type='button' className={styles.add_question_btn} onClick={() => setSelecQuestion(!selecQuestion)} >
                            <FontAwesomeIcon icon={faPlusCircle} className={styles.icon_add_question} />
                            <p>Thêm câu hỏi</p>
                            <FontAwesomeIcon icon={faChevronUp} id={selecQuestion ? styles.list_active : styles.list} className={styles.icon_add_question} />
                        </button>
                    </div>
                </div>


            </div>


        </>
    );
}

export default CreateCourseWork;