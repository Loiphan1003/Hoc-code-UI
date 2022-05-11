import React, { useState, useEffect } from 'react';
// import Header from '../../../components/header/Header';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './MultipleChoiceExercises.module.css';
import Backdrop from '../../../components/Backdrop';
// import AnswerMultipleChoice from '../answer_multiple_choice';


function MultipleChoiceExercises({ data }) {

    const [exerciseName, setExerciseName] = useState('');
    const [answerOne, setAnswerOne] = useState('');
    const [answerSecond, setAnswerSecond] = useState('');
    const [answerThree, setAnswerThree] = useState('');
    const [answerFour, setAnswerFour] = useState('');

    const [valueInputAnswer, setValueInputAnswer] = useState('');
    const [trueAnswer, setTrueAnswer] = useState('');
    const [open, setOpen] = useState({ value: false, answer: 0 });
    const [multipleChoice, setMultipleChoice] = useState(
        {
            cauhoi: '',
            cautraloi_1: '',
            cautraloi_2: '',
            cautraloi_3: '',
            cautraloi_4: '',
            dapan: '',
            nguoitao: null,
        }
    )

    const handleSaveAnswer = (numberAnswer) => {
        switch (numberAnswer) {
            case 1:
                setAnswerOne(valueInputAnswer);
                break;
            case 2:
                setAnswerSecond(valueInputAnswer);
                break;
            case 3:
                setAnswerThree(valueInputAnswer);
                break;
            case 4:
                setAnswerFour(valueInputAnswer);
                break;
            default:
                break;
        }
        setOpen(false);
    }

    const handleDisplayValueAnswer = (numberAnswer) => {
        if (numberAnswer === 1) {
            return answerOne;
        }
        if (numberAnswer === 2) {
            return answerSecond;
        }
        if (numberAnswer === 3) {
            return answerThree;
        }
        if (numberAnswer === 4) {
            return answerFour;
        }
    }

    const handleSave = () => {
        console.log("Lưu");
        setMultipleChoice(
            {
                cauhoi: exerciseName,
                cautraloi_1: answerOne,
                cautraloi_2: answerSecond,
                cautraloi_3: answerThree,
                cautraloi_4: answerFour,
                dapan: trueAnswer,
                nguoitao: localStorage.getItem("User"),
            }
        )
        data(...data, {
            cauhoi: exerciseName,
            cautraloi_1: answerOne,
            cautraloi_2: answerSecond,
            cautraloi_3: answerThree,
            cautraloi_4: answerFour,
            dapan: trueAnswer,
            nguoitao: localStorage.getItem("User") }
        )
    }
    
    
    useEffect(() => {
        if (open === true) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = originalStyle;
        }
    },[open])

    console.log(multipleChoice);
    return (
        <div className={styles.container}>

            {/* <div className={styles.content}> */}

                <div className={styles.content_left} >

                    {/* <div className={styles.exercise_name} >
                            <p>Tên bài</p>
                            <input type='text' onChange={(e) => setExerciseName(e.target.value)} placeholder='Nhâp tên bài tập' />
                        </div> */}

                    <div className={styles.exxercise_disciption} >
                        <h2>Câu hỏi</h2>
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
                                setExerciseName(data);
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

                    <div className={styles.exercise_score} >
                        <h2>Điểm</h2>
                        <input type='number' placeholder="" />
                    </div>
                </div>


                <div className={styles.content_right} >

                    {/* <AnswerMultipleChoice open={setOpen} /> */}

                    <div className={styles.exercise_input} >
                        <h2>Câu trả lời</h2>

                        <div className={styles.input_items} >
                            <div className={styles.input_item} >
                                Câu trả lời 1
                                <FontAwesomeIcon icon={faPencil} onClick={() => setOpen({ value: true, answer: 1 })} />
                            </div>

                            <div className={styles.input_item} >
                                Câu trả lời 2
                                <FontAwesomeIcon icon={faPencil} onClick={() => setOpen({ value: true, answer: 2 })} />
                            </div>

                            <div className={styles.input_item}  >
                                Câu trả lời 3
                                <FontAwesomeIcon icon={faPencil} onClick={() => setOpen({ value: true, answer: 3 })} />
                            </div>

                            <div className={styles.input_item} >
                                Câu trả lời 4
                                <FontAwesomeIcon icon={faPencil} onClick={() => setOpen({ value: true, answer: 4 })} />
                            </div>
                        </div>
                        {open.value && <Backdrop onClick={() => setOpen(false)} />}
                        {open.value && <div className={styles.answer_input}  >
                            <p>Nội dung</p>
                            <CKEditor
                                // className={styles.editor}
                                height="500px"
                                editor={ClassicEditor}
                                data={handleDisplayValueAnswer(open.answer)}
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
                                    setValueInputAnswer(data)
                                    // console.log("Change", { event, editor, data });
                                }}
                            // onBlur={(event, editor) => {
                            //     console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            //     console.log('Focus.', editor);
                            // }}
                            />
                            <div>

                            </div>

                            <div className={styles.btn_answer_input} >
                                <span className={styles.btn_close} onClick={() => setOpen(false)} >Đóng</span>
                                <span className={styles.btn_save} onClick={() => handleSaveAnswer(open.answer)}  >Lưu</span>
                            </div>
                        </div>
                        }
                    </div>

                    <div className={styles.exercise_level} >
                        <h2>Đáp án</h2>
                        <select  onChange={e => setTrueAnswer(e.target.value)} >
                            <option value='1' >Câu 1</option>
                            <option value='2' >Câu 2</option>
                            <option value='3' >Câu 3</option>
                            <option value='4' >Câu 4</option>
                        </select>
                    </div>
                    {/* {HTMLReactParser(discription)} */}
                </div>

                <div className={styles.exercise_btn} >
                    <p>Hủy</p>
                    <button onClick={handleSave} >Lưu</button>
                </div>
            {/* </div> */}
        </div>
    );
}

export default MultipleChoiceExercises;