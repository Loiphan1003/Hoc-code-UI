import React, { useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import styles from './CreateBTLuyenTap.module.css';
import Backdrop from '../../../components/Backdrop';
import BaiTapLuyenTapAPI from '../../../apis/baiTapLuyenTapAPI';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

function CreateBTLuyenTap(props) {
    
    const [nameExercise, setNameExercise] = useState("");
    const [level, setLevel] = useState(1);
    const [openTestCase, setOpenTestCase] = useState(false);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [testCases, setTestCases] = useState([]);

    const deBaiRef = useRef()
    const rangBuocRef = useRef()
    const dinhDangDauVaoRef = useRef()
    const dinhDangDauRaRef = useRef()
    const mauDauVaoRef = useRef()
    const mauDauRaRef = useRef()
    const tagRef = useRef()
    const navigate = useNavigate();
    const uId = JSON.parse(localStorage.getItem('uId')); 


    const handleSaveExercise = () => {
        if(!!uId || sessionStorage.getItem('Admin') === 'true')
        {
            if(level === undefined || nameExercise === undefined || deBaiRef.current.value === undefined || rangBuocRef.current.value === undefined || 
                dinhDangDauVaoRef === undefined || dinhDangDauRaRef === undefined || mauDauVaoRef === undefined || mauDauRaRef === undefined || tagRef === undefined || testCases.length === 0
                )
                {
                    alert("Vui l??ng nh???p ?????y ????? th??ng tin");
                    return;
                }
            let ob = {
                doKho: level,
                tieuDe: nameExercise,
                deBai: deBaiRef.current.value,
                // uIdNguoiTao: user.uid,
                rangBuoc: rangBuocRef.current.value,
                dinhDangDauVao: dinhDangDauVaoRef.current.value,
                dinhDangDauRa: dinhDangDauRaRef.current.value,
                mauDauVao: mauDauVaoRef.current.value,
                mauDauRa: mauDauRaRef.current.value,
                tag:tagRef.current.value,
                testCases: testCases
            }
    
            console.log(ob);
            const addBTCode = async () => {
                try {
                    const response = await BaiTapLuyenTapAPI.add(ob);
                    if(response.data)
                        alert("Th??m b??i t???p luy???n t???p th??nh c??ng!")
                    navigate('/Admin/Quanlybaitapcode')
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            addBTCode();
        }
    }
    
    const handleAddTestCase = () => {
        setTestCases(
            [
                ...testCases,
                { Input: input, Output: output }
            ]
        )
        setOpenTestCase(false);
        setInput('')
        setOutput('')
    }

    const handleRemoveInput = (index) => {
        testCases.splice(index,1)
        setTestCases([...testCases])
    }

    return (
        <>
            <div className={styles.content} >

                <input className={styles.input_NameEx}
                    type='text' placeholder='Nh????p t??n ba??i t???p' 
                    onChange={e => setNameExercise(e.target.value)}
                ></input>

                <div className={styles.exxercise_discription} >
                    M?? t???
                    <TextField inputRef={deBaiRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p ????? b??i" multiline />
                    <TextField inputRef={rangBuocRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p r??ng bu???c" multiline />
                    <TextField inputRef={dinhDangDauVaoRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p ?????nh d???ng ?????u v??o" multiline />
                    <TextField inputRef={dinhDangDauRaRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p ?????nh d???ng ?????u ra" multiline />
                    <TextField inputRef={mauDauVaoRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p m???u ?????u v??o" multiline />
                    <TextField inputRef={mauDauRaRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p m???u ?????u ra" multiline />
                    <TextField inputRef={tagRef} sx={{marginTop:"20px"}} fullWidth label="Nh???p tag" multiline />
                </div>
                
                <div className={styles.exercise_level} >
                    <FormControl fullWidth>
                        <InputLabel id="level-label">C????p ??????</InputLabel>
                        <Select
                            labelId="level-label"
                            value={level}
                            label="C????p ??????"
                            onChange={e => setLevel(e.target.value)}
                        >
                            <MenuItem value={1}>D????</MenuItem>
                            <MenuItem value={2}>Trung b??nh</MenuItem>
                            <MenuItem value={3}>Kh??</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={styles.content_TestCase} >

                        <Button  variant="contained" className={styles.btnAddTestCase}
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => setOpenTestCase(true)}
                        >
                            Th??m TestCase
                        </Button>

                    {testCases.map((testcase, index) => (
                        <div className={styles.testcase} key={index} >
                            <div className={styles.name_input} >
                                TestCase #{index + 1}
                            </div>

                            <div className={styles.testcase_btn} >
                                <FontAwesomeIcon className={styles.btn_update} icon={faPen} />
                                <FontAwesomeIcon className={styles.btn_delete} icon={faTrashCan} onClick={() => handleRemoveInput(index)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.exercise_btn} >
                    <Button  variant="contained" style={{backgroundColor:"darkgray"}}
                        endIcon={<CancelIcon />}
                        onClick={() => {
                            navigate(`/Admin/Quanlybaitapcode`);
                        }}
                    >
                        Hu??y
                    </Button>

                    <Button  variant="contained" style={{marginLeft:"20px"}}
                        endIcon={<SaveIcon />}
                        onClick={() => handleSaveExercise()}
                    >
                        L??u
                    </Button>
                </div>
            </div>
            
            {/* Dialog Add TestCase */}
            {openTestCase && <Backdrop onClick={() => setOpenTestCase(false)} />}
            {openTestCase && <div className={styles.input_testcase} >
                <h2>NH????P TESTCASE</h2>
                <div>
                    <TextField className={styles.input_output}  label="??????u va??o" 
                        placeholder="Nh????p ??????u va??o (input)" value={input}
                        multiline onChange= {e => setInput(e.target.value)}/>
                    <div style={{width:"100%", height:"20px"}}></div>
                    <TextField className={styles.input_output} label="??????u ra" 
                        placeholder="Nh????p ??????u ra (output)" value={output}
                        multiline onChange= {e => setOutput(e.target.value)}/>
                </div>
                <div className={styles.btn_intputTestCase} >
                    <Button  variant="contained" style={{backgroundColor:"ButtonShadow"}}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenTestCase(false) }
                    >
                        Hu??y
                    </Button>

                    <Button  variant="contained" style={{marginLeft:"20px"}}
                        endIcon={<SaveIcon />}
                        onClick={handleAddTestCase}
                    >
                        L??u
                    </Button>
                </div>
            </div>}
        </>
    );
}

export default CreateBTLuyenTap;