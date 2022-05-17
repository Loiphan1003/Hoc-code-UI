import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditTextarea } from 'react-edit-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import styles from './CreateExercise.module.css';
import Backdrop from '../../../components/Backdrop';
import BaiTapCodeAPI from '../../../apis/baiTapCodeAPI';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CreateExercise(props) {

    const defaulDiscrition = "<h3>Đề bài</h3><p>&nbsp;</p><h3>Mô tả</h3><p>&nbsp;</p><h3><i><strong>SampleInput</strong></i></h3><blockquote><p>&nbsp;</p></blockquote><h3><i><strong>SampleOutput</strong></i></h3><blockquote><p>&nbsp;</p></blockquote>"
    const [nameExercise, setNameExercise] = useState("");
    const [discription, setDiscription] = useState("");
    const [level, setLevel] = useState(1);
    const [openTestCase, setOpenTestCase] = useState(false);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [testCases, setTestCases] = useState([]);
    const [file, setFile] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const [exercise, setExercise] = useState({
        tag: "lập trình",
        dokho: 'Dễ',
        tieude: "tên bài",
        debai: 'mô tả',
        ispublic: false,
    })

    const handleSaveExercise = () => {
        let ob = {
            doKho: "Dễ",
            tieuDe: nameExercise,
            deBai: discription,
            isPublic: isPublic,
            uIdNguoiTao: "gv1",
            testCases: testCases
        }

        const addBTCode = async () => {
            try {
                const response = await BaiTapCodeAPI.postAddBaiTapCode(ob);
                console.log(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        addBTCode();
    }

    const handleAddTestCase = () => {
        setTestCases(
            [
                ...testCases,
                { input: { input }, output: { output } }
            ]
        )
        setOpenTestCase(false);
        setInput('')
        setOutput('')
    }

    const handleRemoveInput = (index) => {
        testCases.splice(index, 1)
        setTestCases([...testCases])
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

    return (
        <>
            <div className={styles.container}>

                <TextField fullWidth label="Nhập tên bài tập" onChange={e => setNameExercise(e.target.value)}
                    placeholder='Nhập tên bài tập' />

                <div className={styles.exxercise_disciption} >
                    <p>Mô tả</p>
                    <CKEditor
                        // className={styles.editor}
                        height="700px"
                        editor={ClassicEditor}
                        data={defaulDiscrition}
                        config={{
                            toolbar: ['heading', '|','alignment','bold', 'italic', 'blockQuote', 'link','_','code', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
                                'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo'],
                            shouldNotGroupWhenFull: true
                        }}
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "400px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDiscription(data);
                        }}

                    />
                </div>

                <div className={styles.exercise_score} >
                    <p>Điểm</p>
                    <input type='number' placeholder="" />
                </div>

                <div className={styles.exercise_level} >
                    <FormControl fullWidth>
                        <InputLabel id="level-label">Cấp độ</InputLabel>
                        <Select
                            labelId="level-label"
                            value={level}
                            label="Cấp độ"
                            onChange={e => setLevel(e.target.value)}
                        >
                            <MenuItem value={1}>Dễ</MenuItem>
                            <MenuItem value={2}>Khó</MenuItem>
                            <MenuItem value={3}>Trung Bình</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControlLabel control={<Checkbox onChange={e => setIsPublic(e.target.checked)} />} label="Công khai" />

                <div className={styles.content_right} >

                    <Button variant="contained" className={styles.btnAddTestCase}
                        endIcon={<AddCircleOutlinedIcon />}
                        onClick={() => setOpenTestCase(true)}
                    >
                        Thêm TestCase
                    </Button>

                    {testCases.map((testcase, index) => (
                        <div className={styles.testcase} key={index} >
                            <div className={styles.name_input} >
                                <label>Kiểm thử {index + 1}</label><br />
                            </div>

                            <div className={styles.testcase_btn} >
                                <FontAwesomeIcon className={styles.btn_update} icon={faPen} />
                                <FontAwesomeIcon className={styles.btn_delete} icon={faTrashCan} onClick={() => handleRemoveInput(index)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.exercise_btn} >
                    <Button variant="contained" style={{ backgroundColor: "ButtonShadow" }}
                        endIcon={<CancelIcon />}
                        onClick={() => { console.log("Thực hiện thao tác trở vể trang trước"); }}
                    >
                        Hủy
                    </Button>

                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<SaveIcon />}
                        onClick={handleSaveExercise}
                    >
                        Lưu
                    </Button>
                </div>

                {/* Dialog Add TestCase */}
                {openTestCase && <Backdrop onClick={() => setOpenTestCase(false)} />}
                {openTestCase && <div className={styles.input_testcase} >
                    <h2>NHẬP TESTCASE</h2>
                    <div>
                        <TextField className={styles.input_output} label="Đầu vào"
                            placeholder="Nhập đầu vào (input)" value={input}
                            multiline onChange={e => setInput(e.target.value)} />
                        <div style={{ width: "100%", height: "30px" }}></div>
                        <TextField className={styles.input_output} label="Đầu ra"
                            placeholder="Nhập đầu ra (output)" value={output}
                            multiline onChange={e => setOutput(e.target.value)} />
                    </div>
                    <div className={styles.btn_intputTestCase} >
                        <Button variant="contained" style={{ backgroundColor: "ButtonShadow" }}
                            endIcon={<CancelIcon />}
                            onClick={() => setOpenTestCase(false)}
                        >
                            Hủy
                        </Button>

                        <Button variant="contained" style={{ marginLeft: "20px" }}
                            endIcon={<SaveIcon />}
                            onClick={handleAddTestCase}
                        >
                            Lưu
                        </Button>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default CreateExercise;