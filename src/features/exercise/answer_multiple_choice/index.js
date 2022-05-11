import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './AnswerMultiple.module.css';


function AnswerMultipleChoice(props) {

    const [open, setOpen] = useState({ value: false, answer: 0 });

    const [answerOne, setAnswerOne] = useState('');
    const [answerSecond, setAnswerSecond] = useState('');
    const [answerThree, setAnswerThree] = useState('');
    const [answerFour, setAnswerFour] = useState('');
    const [valueInputAnswer, setValueInputAnswer] = useState('');

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
    console.log(open);

    return (

        <>
            <div className={styles.exercise_input} >
                <p>Câu trả lời</p>

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
                        <span className={styles.btn_save}
                        onClick={() => handleSaveAnswer(open.answer)}  
                        >Lưu</span>
                    </div>
                </div>
                }
            </div>


        </>

    );
}

export default AnswerMultipleChoice;