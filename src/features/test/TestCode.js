import React, {useState,useEffect} from 'react';
import AceEditor from 'react-ace-builds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import "react-ace-builds/webpack-resolver-min";
import styles from './styles/TestCode.module.css';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI';
import RunCodeAPI from '../../apis/runCodeAPI';
import CircularProgress from '@mui/material/CircularProgress';
import { faCircleCheck, faCircleXmark, faCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import doTestSlice from '../../redux/doTestSlice';
import { useDispatch, useSelector } from 'react-redux';


function TestCode({data}) {

    const dispatch = useDispatch();
    const answer = useSelector((state) => state.doTest.answer.find(element => element.id === data.id&&element.loaiCauHoi=== data.loaiCauHoi))
    const language = {'py' : 'Python','c': 'C','c++': 'C++','java': 'Java' }

    const [openTestCase, setOpenTestCase] = useState(false);
    const [baiTapCode,setBaiTapCode] = useState({});
    const [testCase,setTestCase] = useState([]);

    useEffect(() => {
        const getBaiTapCode = async () => {
            const response = await BaiTapCodeAPI.getOne(data.id);
            setBaiTapCode(response.data);
        }
        getBaiTapCode();

        const getTestCase = async ()=>{
            const response = await RunCodeAPI.getTestCaseBTByID(data.id);
            setTestCase(response.data)
        }
        getTestCase();
    }, [data]);
    
    const handleRunCode = () => {
        const runCode = async()=>{
            try {
                const response = await RunCodeAPI.postRunCodeBaiTap({
                    code: answer.dapAn,
                    input: '',
                    language: 'c'
                },data.id,)
                const score = response.data;
                const heSoDiem = (score.reduce((sum,value) => sum+value,0)) / score.length;

                dispatch(doTestSlice.actions.addAnswer({
                    ...answer,
                    diemDatDuoc:heSoDiem*data.diem
                }))

                setTestCase(response.data);
            } catch (error) {
                console.log(error)
            }
            
        }
        runCode();
    }

    function onChange(newValue) {
        dispatch(doTestSlice.actions.addAnswer({
            id:data.id,
            stt:data.stt,
            loaiCauHoi:1,
            cauHoi:baiTapCode.deBai,
            dapAn: newValue,
            diemToiDa:data.diem,
            diemDatDuoc:0
        }))
    }

    return (
        <div className={styles.code} >
            <h2>Câu hỏi {data.stt}</h2>
            <div className={styles.content}>
                <h1>{baiTapCode.tieuDe}</h1>
                <div className={styles.question}>
                    {baiTapCode.deBai}
                </div>

                <div className={styles.input_format}>
                    <h2>Định dạng đầu vào</h2>
                    <p>{baiTapCode.dinhDangDauVao}</p>
                </div>

                <div className={styles.contraints}>
                    <h2>Ràng buộc</h2>
                    <p>{baiTapCode.rangBuoc}</p>
                </div>

                <div className={styles.ouput_format}>
                    <h2>Định dạng đầu ra</h2>
                    <p> {baiTapCode.dinhDangDauRa}</p>
                </div>

                <div className={styles.sample_input}>
                    <h2>Đầu vào mẫu</h2>
                    <div>{baiTapCode.mauDauVao}</div>
                </div>

                <div className={styles.sample_output}>
                    <h2>Đầu ra mẫu</h2>
                    <div>{baiTapCode.mauDauRa}</div>
                </div>

                <div>
                    <h2>Ngôn ngữ </h2>
                    <p>{language[baiTapCode.ngonNgu]}</p>
                </div>
            </div>

            <div className={styles.code_section} >
                <AceEditor 
                    value={ !!answer ? answer.dapAn : ""}
                    mode="c_cpp"
                    theme='one_dark'
                    fontSize='12pt'
                    name="UNIQUE_ID_OF_DIV"
                    width='70%'
                    height='400px'
                    showPrintMargin={false}
                    // enableSnippets= {true}
                    onChange={onChange}
                    editorProps={{
                        $blockScrolling: true,
                    }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                    }}
                />

                <div className={styles.testcase_section} >
                    <div className={styles.testcase_header} >
                        <div className={styles.testcaseTitle} onClick={() => setOpenTestCase(!openTestCase)} >
                            {openTestCase ? <FontAwesomeIcon icon={faChevronUp}/>
                            : <FontAwesomeIcon icon={faChevronDown} />}
                            <p>Test case</p>
                        </div>
                        <div className={styles.twoButon}>
                            
                            <button onClick={() => handleRunCode()} >Nộp bài</button>
                        </div>
                        
                    </div>

                    {openTestCase && 
                        <div className={styles.testcase_list} >
                            {
                                testCase.map( (item, index) => (
                                    <div className={styles.testcase_item} key={index} >
                                        {item === 3 ? <CircularProgress size={16}/>
                                            : <FontAwesomeIcon
                                                className={clsx({
                                                    [styles.icon_success]: item === 1 || item === 2,
                                                    [styles.icon_error]: item === 0
                                                })}
                                                icon={item === 2
                                                    ? faCircle : (item === 1
                                                        ? faCircleCheck : faCircleXmark)}
                                            />
                                        }
                                        <p>#TestCase {index}</p>
                                    </div>
                                ))
                            }
                        </div> 
                    }
                </div>
            </div>


        </div>
    );
}

export default TestCode;