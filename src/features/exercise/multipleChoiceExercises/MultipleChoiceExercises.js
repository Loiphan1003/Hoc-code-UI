import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BaiTapTN from '../../../apis/baiTapTN_API';
import { useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import styles from './MultipleChoiceExercises.module.css';


function MultipleChoiceExercises({ data }) {

    let params = useParams();
    // const [valueInputAnswer, setValueInputAnswer] = useState('');
    const [trueAnswer, setTrueAnswer] = useState('');
    // const [getData, setGetData] = useState();
    // const [open, setOpen] = useState({ value: false, answer: 0 });

    const cauHoiRef = useRef();
    const answerOneRef = useRef();
    const answerSecondRef = useRef();
    const answerThreeRef = useRef();
    const answerFourRef = useRef();

    const handleSave = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let ob =
                {
                    cauHoi: cauHoiRef.current.value,
                    cauTraLoi1: answerOneRef.current.value,
                    cauTraLoi2: answerSecondRef.current.value,
                    cauTraLoi3: answerThreeRef.current.value,
                    cauTraLoi4: answerFourRef.current.value,
                    dapAn: trueAnswer,
                    uIdNguoiTao: user.uid
                }
                const addBTTN = async () => {
                    try {
                        const response = await BaiTapTN.postAddBaiTapTN(ob);
                        console.log(response.data);
                        if (response.data)
                            alert('Thêm bài tập trắc nghiệm thành công!')
                    } catch (error) {
                        console.log("Fetch data error: ", error);
                    }
                }
                addBTTN();
            }
        });

    }


    // useEffect(() => {
    //     if (params.exerciseId !== undefined) {
    //         const getData = async () => {
    //             try {
    //                 const response = await BaiTapTN.getOne(params.exerciseId)
    //                 setGetData(response.data);
    //                 setAnswerOne(response.data.cauTraLoi1);
    //                 setAnswerSecond(response.data.cauTraLoi2);
    //                 setAnswerThree(response.data.cauTraLoi3);
    //                 setAnswerFour(response, data.cauTraLoi4);
    //             } catch (error) {
    //                 console.log("Error: ", error);
    //             }
    //         }
    //         getData();
    //         return;
    //     }
    // }, [params.exerciseId])


    // useEffect(() => {
    //     if (open === true) {
    //         const originalStyle = window.getComputedStyle(document.body).overflow;
    //         document.body.style.overflow = 'hidden';
    //         return () => document.body.style.overflow = originalStyle;
    //     }
    // }, [open])

    return (
        <>
            <div className={styles.content}>

                <div className={styles.exxercise_disciption} >
                    <h2>Câu hỏi</h2>
                    <TextField inputRef={cauHoiRef} sx={{ marginTop: "20px" }} fullWidth label="Nhập câu hỏi" multiline />
                </div>
            </div>

            <div className={styles.content_answer} >
                <div className={styles.exercise_input} >
                    <h2>Câu trả lời</h2>
                    <div className={styles.input_items} >
                        <div className={styles.input_item}  >
                            A:
                            <div className={styles.conten_input} >
                                <input ref={answerOneRef} type={'text'} placeholder="Nhập câu trả lời"></input>
                            </div>
                        </div>

                        <div className={styles.input_item} >
                            B:
                            <div className={styles.conten_input} >
                                <input ref={answerSecondRef} type={'text'} placeholder="Nhập câu trả lời"></input>
                            </div>
                        </div>

                        <div className={styles.input_item} >
                            C:
                            <div className={styles.conten_input} >
                                <input ref={answerThreeRef} type={'text'} placeholder="Nhập câu trả lời"></input>
                            </div>
                        </div>

                        <div className={styles.input_item} >
                            D:
                            <div className={styles.conten_input} >
                                <input ref={answerFourRef} type={'text'} placeholder="Nhập câu trả lời"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Đáp án</h2>
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                    <InputLabel id="level-label">Đáp án</InputLabel>
                    <Select
                        labelId="level-label"
                        value={trueAnswer}
                        label="Cấp độ"
                        onChange={e => setTrueAnswer(e.target.value)}
                    >
                        <MenuItem value={1}>Câu A</MenuItem>
                        <MenuItem value={2}>Câu B</MenuItem>
                        <MenuItem value={3}>Câu C</MenuItem>
                        <MenuItem value={4}>Câu D</MenuItem>
                    </Select>
                </FormControl>

            </div>

            <div className={styles.exercise_btn} >
                <Button variant="contained" style={{ backgroundColor: "ButtonShadow" }}
                    endIcon={<CancelIcon />}
                >
                    Hủy
                </Button>

                <Button variant="contained" style={{ marginLeft: "20px" }}
                    endIcon={<SaveIcon />}
                    onClick={() => handleSave()}
                >
                    Lưu
                </Button>
            </div>
        </>
    );
}

export default MultipleChoiceExercises;