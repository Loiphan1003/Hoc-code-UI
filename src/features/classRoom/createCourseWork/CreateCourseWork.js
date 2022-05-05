import React, { useState } from 'react';
import styles from './CreateCourseWork.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { Radio, Input, Space } from 'antd';
import { faLeftLong, faPlusCircle, faChevronUp, faChevronDown, faCode, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { current } from '@reduxjs/toolkit';


function CreateCourseWork(props) {

    const [courseName, setCourseName] = useState("");
    const [checked, setChecked] = useState(false);
    const [visibility, setVisibility] = useState('darft');
    // const [timeOpen, setTimeOpen] = useState();
    const [selecQuestion, setSelecQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);

    // let openDate = new Date(timeOpen);
    // console.log(checked);

    const CodeQuestion = { type: "code", name: "question 1", language: "c" };


    const handAddQuestion = (value) => {
        if (value === 'code') {
            setQuestions(
                // current 
                // => 
                [
                    ...current,
                    { type: "code", name: "question 1", language: "c" }
                ]
            )
        } else if (value === 'mutiple_question') {
            setQuestions(
                current => 
                [
                    ...questions,
                    { type: "mutiple_question", name: "question 1", option_1: false, option_2: false, option_3: false, option_4: false, answer: "c" }
                ]
            )
        }
    }

    console.log("Question: ",  questions);

    const handleAnswer = (event) => {
        // console.log(event.target.value);
    }

    let listQuesion = [];
    const handleSave = () => {
        console.log("Click");
        listQuesion.push(questions)
        // return;
        
    }


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
                        <p>Mô tả:</p>
                    </div>

                    <div className={styles.course_visibility} >
                        <p>Hiện thị:</p>
                        <form>
                            <input type="radio" id='darft' value="darft" onChange={(e => setVisibility(e.target.value))} checked={visibility === 'darft'} />
                            <label htmlFor="darft" >Lưu vào nháp</label> <br />
                            <input type="radio" id='schedule' value="schedule" onChange={(e => setVisibility(e.target.value))} checked={visibility === 'schedule'} />
                            <label htmlFor="schedule" >Phân lịch bài tập</label>
                        </form>
                    </div>

                    <div>
                        <label>Cài đặt câu hỏi:</label><br />
                        <FormControlLabel
                            value="Cài đặt câu hỏi"
                            control={<Switch color="primary" onChange={() => setChecked(!checked)} />}
                        />
                    </div>

                    <div >
                        <p>Ngày mở và kết thúc:</p>
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

                    <div>
                        {questions.map((question, index) => (
                            <div key={index} className={styles.question_item} >
                                <input className={styles.question_item_name} type='text' placeholder={`Câu hỏi ${index + 1}`} />
                                <p>Mô tả</p>

                                <div className={question.type === 'code' ? '' : styles.none} >
                                    <label>Chọn ngôn ngữ:</label>
                                    <select className={styles.question_item_selection} >
                                        <option>C</option>
                                        <option>C++</option>
                                        <option>C#</option>
                                        <option>Java</option>
                                        <option>Python</option>
                                    </select>
                                </div>

                                <div className={question.type === 'code' ? styles.question_item_solution : styles.none} >
                                    <div className={styles.question_item_solution_header} >
                                        <p>Bước 1 <br /> <span>Solution Code</span></p>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                </div>

                                <div className={question.type === 'code' ? styles.question_item_solution : styles.none} >
                                    <div className={styles.question_item_solution_header} >
                                        <p>Bước 2 <br /> <span>Stater Code</span></p>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                </div>

                                <div className={question.type === 'code' ? styles.question_item_solution : styles.none} >
                                    <div className={styles.question_item_solution_header} >
                                        <p>Bước 3 <br /> <span>Test case</span></p>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                </div>

                                <div className={question.type === 'mutiple_question' ? styles.question_item_mutiple_active : styles.none} >
                                    <p>Câu trả lời</p>
                                    <Radio.Group onChange={(e) => handleAnswer(e)} defaultValue='1'>
                                        <Space className={styles.question_item_radio} >
                                            <Radio value='1' >
                                                <input className={styles.question_answer} type='text' placeholder='Option 1' />
                                            </Radio>

                                            <Radio value='2' >
                                                <input className={styles.question_answer} type='text' placeholder='Option 2' />
                                            </Radio>

                                            <Radio value='3' >
                                                <input className={styles.question_answer} type='text' placeholder='Option 3' />
                                            </Radio>

                                            <Radio value='4' >
                                                <input className={styles.question_answer} type='text' placeholder='Option 4' />
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.add_question} >

                        {selecQuestion && <div className={styles.backdrop} onClick={()=> setSelecQuestion(false)} ></div>}
                        {selecQuestion && <div className={styles.nav_question}>
                            <button className={styles.nav_question_item} onClick={() => handAddQuestion("code")} >
                                <FontAwesomeIcon icon={faCode} />
                                <p>Bài tập code</p>
                            </button>

                            <button className={styles.nav_question_item} onClick={() => handAddQuestion("mutiple_question")} >
                                <FontAwesomeIcon icon={faCircleQuestion} />
                                <p>Câu hỏi trắc nghiệm</p>
                            </button>
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