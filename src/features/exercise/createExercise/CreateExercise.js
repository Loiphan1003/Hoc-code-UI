import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditTextarea } from 'react-edit-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
// import Header from '../../../components/header/Header';
// import HTMLReactParser from 'html-react-parser';
import styles from './CreateExercise.module.css';
import Backdrop from '../../../components/Backdrop';
// import { Select } from 'antd';

function CreateExercise(props) {


    const [nameExercise, setNameExercise] = useState("");
    const [discription, setDiscription] = useState("");
    const [level, setLevel] = useState();
    const [openTestCase, setOpenTestCase] = useState(false);
    const [inputs, setInputs] = useState();
    const [outputs, setOutputs] = useState();
    const [testCases, setTestCases] = useState([]);
    const [file, setFile] = useState();
    const [exercise, setExercise] = useState({
        tag: "lập trình",
        dokho: 'Dễ',
        tieude: "tên bài",
        debai: 'mô tả',
        ispublic: false,
    })


    // const ref = useRef()
    // const handleAddInput = () => {
    //     setInputs(
    //         [
    //             ...inputs,
    //             { id: inputs.length, name: 'arg', type: "string" }
    //         ]
    //     )
    // }

    const handleSaveExercise = (name, level, discription) => {
        console.log("Lưu thành công");
        setExercise(
            {
                tag: "lập trình",
                dokho: level,
                tieude: name,
                debai: discription,
                ispublic: false,
            }
        )
        props.data.push(
            {
                tag: "lập trình",
                dokho: level,
                tieude: name,
                debai: discription,
                ispublic: false,
            }
        )
    }

    const handleAddTestCase = (input, output) => {
        setTestCases(
            [
                ...testCases,
                { id: testCases.length, input: { input }, output: { output } }
            ]
        )
        setOpenTestCase(false);
    }
    // const handleChangeName = (name, index) => {
    //     setInputs(
    //         // Tim dau vao qua id sau do dung Oject.assign de sao chep va hop nhat cung du lieu thuoc tinh moi la name
    //         inputs.map(input => input.id === index ? Object.assign(input, { name }) : input)
    //     )
    // }
    // const handleChangeLevelInput = (type, index) => {
    //     setInputs(
    //         // Tim dau vao qua id sau do dung Oject.assign de sao chep va hop nhat cung du lieu thuoc tinh moi la type
    //         inputs.map(input => input.id === index ? Object.assign(input, { type }) : input)
    //     )
    // }

    const handleSaveInput = ({ name, value, previousValue }) => {
        setInputs(value)
    };

    const handleSaveOutput = ({ name, value, previousValue }) => {
        setOutputs(value)
    };
    const handleRemoveInput = (value) => {
        const remove = testCases.filter(testcase => testcase.id !== value);
        setTestCases(remove);
    }

    useEffect(() => {
        if (openTestCase === true) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = originalStyle;
        }
    }, [openTestCase])

    

    

    const handleFileChosen = (e) => {
        
        
        const reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onloadend = (e) => {
            setFile(e.target.result);
        }
        reader.onerror = () => {
            console.log("File error: ", reader.error);
        }

    };


    // useEffect(() => {
    //     setTestCases(testCases);
    // }, [testCases])
    // ref.current = testCases;


    return (
        <>
            <div className={styles.container}>

                {/* <div className={styles.content}> */}
                <div className={styles.content_left} >

                    <div className={styles.exercise_name} >
                        <p>Tên bài</p>
                        <input type='text' onChange={e => setNameExercise(e.target.value)} placeholder='Nhâp tên bài tập' />
                    </div>

                    <div className={styles.exxercise_disciption} >
                        <p>Mô tả</p>
                        <CKEditor
                            // className={styles.editor}
                            height="500px"
                            editor={ClassicEditor}
                            data="<p>hello world</p>"
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
                                setDiscription(data);
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
                        <p>Điểm</p>
                        <input type='number' placeholder="" />
                    </div>

                    <div className={styles.exercise_level} >
                        <p>Cấp độ</p>
                        <select defaultValue="Dễ" onChange={e => setLevel(e.target.value)} >
                            <option>Dễ</option>
                            <option>Trung bình</option>
                            <option>Khó</option>
                        </select>
                    </div>


                </div>


                <div className={styles.content_right} >

                    {/* <div className={styles.exercise_input} >
                            <p>Đầu vào</p>
                            <div className={styles.exercise_add_button} onClick={() => handleAddInput()} >
                                <FontAwesomeIcon icon={faPlus} />
                                <p>Thêm đầu vào</p>
                            </div>
                        </div> */}

                    {/* {inputs.map(input => (
                            <div className={styles.input} key={input.id} >
                                <div className={styles.name_input} >
                                    <label>Tên</label><br />
                                    <input type='text' value={input.name} onChange={(e) => handleChangeName(e.target.value, input.id)} />
                                </div>

                                <div className={styles.type_input} >
                                    <label>Kiểu</label><br />
                                    <select value={input.type} onChange={(e) => handleChangeLevelInput(e.target.value, input.id)} >
                                        <option>integer</option>
                                        <option>float</option>
                                        <option>string</option>
                                        <option>boolean</option>
                                        <option>char</option>
                                    </select>
                                </div>

                                <FontAwesomeIcon icon={faTrashCan} size='2x' onClick={() => handleRemoveInput(input.id)} />
                            </div>
                        ))} */}



                    <div className={styles.exercise_input} >
                        <p>Kiểm thử</p>
                        <div className={styles.exercise_add_button} onClick={() => setOpenTestCase(true)} >
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Thêm kiểm thử</p>
                        </div>
                    </div>

                    {testCases.map((testcase, index) => (
                        <div className={styles.testcase} key={testcase.id} >
                            <div className={styles.name_input} >
                                <label>Kiểm thử {index + 1}</label><br />
                                {/* <input type='text' value={input.name} onChange={(e) => handleChangeName(e.target.value, input.id)} /> */}
                            </div>

                            <div className={styles.testcase_btn} >
                                <FontAwesomeIcon className={styles.btn_update} icon={faPen} />
                                <FontAwesomeIcon className={styles.btn_delete} icon={faTrashCan} onClick={() => handleRemoveInput(testcase.id)} />
                            </div>
                        </div>
                    ))}


                    {openTestCase && <Backdrop onClick={() => setOpenTestCase(false)} />}
                    {openTestCase && <div className={styles.input_testcase} >
                        <div className={styles.input_value} >
                            <p>Đầu vào</p>
                            <EditTextarea rows={2} placeholder="Nhập đầu vào" onSave={handleSaveInput} />
                        </div>

                        <div className={styles.input_value} >
                            <p>Kết quả</p>
                            <EditTextarea rows={2} placeholder="Nhập đầu vào" onSave={handleSaveOutput} />
                        </div>

                        <div className={styles.btn_open_testcase} >
                            <span className={styles.btn_close} onClick={() => setOpenTestCase(false)} >Đóng</span>
                            <span className={styles.btn_save} onClick={() => handleAddTestCase(inputs, outputs)} >Lưu</span>
                        </div>
                    </div>}
                    {/* <div>
                            {HTMLReactParser(discription)}
                        </div> */}
                </div>

                <div className={styles.exercise_btn} >
                    <p>Hủy</p>
                    <button onClick={() => handleSaveExercise(nameExercise, level, discription)}>Lưu</button>
                    <input type="file" name='file' onChange={(e) => handleFileChosen(e)} />
                    <p>{file}</p>
                </div>
                {/* </div> */}
            </div>
        </>
    );
}

export default CreateExercise;