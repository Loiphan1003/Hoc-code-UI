import React, { useState, useRef } from 'react';
import styles from './MultipleChoiceExercises.module.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import BaiTapTN from '../../../apis/baiTapTN_API';

function MultipleChoiceExercises({ data }) {

    const navigate = useNavigate();
    const [trueAnswer, setTrueAnswer] = useState(1);
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
                        if (response.data) {
                            alert('Thêm bài tập trắc nghiệm thành công!')
                            navigate('/exercise');
                        }
                    } catch (error) {
                        console.log("Fetch data error: ", error);
                    }
                }
                addBTTN();
            }
        });

    }


    // useEffect(() => {
    //     if (open === true) {
    //         const originalStyle = window.getComputedStyle(document.body).overflow;
    //         document.body.style.overflow = 'hidden';
    //         return () => document.body.style.overflow = originalStyle;
    //     }
    // },[open])

    return (
        <div>
            <div className={styles.content} >

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
                    onClick={handleSave}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default MultipleChoiceExercises;