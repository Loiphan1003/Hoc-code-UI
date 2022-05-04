import React, { useState, useEffect } from 'react';
import styles from './CreateCourseWork.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { faLeftLong, faPlusCircle, faChevronUp, faCode, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';


function CreateCourseWork(props) {

    const [courseName, setCourseName] = useState("");
    const [checked, setChecked] = useState(false);
    const [visibility, setVisibility] = useState('darft');
    const [timeOpen, setTimeOpen] = useState();
    const [selecQuestion, setSelecQuestion] = useState(false);
    const [typeQuestion, setTypeQuestion] = useState('');

    let openDate = new Date(timeOpen);
    // console.log(checked);
    const courseWorks = [];

    const codeQuestion = [
        {
            type: "code",
            name: "question 1",
            language: "c"
        }
    ]

    const handAddQuestion = (value) => {
        console.log(value);

        // switch (value) {
        //     case "code":
        //         courseWorks.push(codeQuestion)
        //         break;
        //     case "mutiple_question":
        //         courseWorks.push(codeQuestion)
        //         break;
        //     default:
        //         break;
        // }
        if(value === "code"){
            return courseWorks.push(codeQuestion);
        }
    }
    console.log(courseWorks.length);

    // useEffect(() =>{
    //     console.log("Active");
    // },[courseWorks])

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

                <div className={styles.header_right}>
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
                        {courseWorks.map(courseWork => (
                            <div key={courseWork.name} >
                                {courseWork.name}
                            </div>
                        ))}
                    </div>


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

                    <button type='button' className={styles.add_question} onClick={() => setSelecQuestion(!selecQuestion)} >
                        <FontAwesomeIcon icon={faPlusCircle} className={styles.icon_add_question} />
                        <p>Thêm câu hỏi</p>
                        <FontAwesomeIcon icon={faChevronUp} id={selecQuestion ? styles.list_active : styles.list} className={styles.icon_add_question} />
                    </button>

                </div>


            </div>
        </>
    );
}

export default CreateCourseWork;