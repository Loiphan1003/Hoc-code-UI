import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { EditTextarea } from 'react-edit-text';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './CodeUi.module.css';
import RunCodeAPI from '../../apis/runCodeAPI';
import AceEditor from "react-ace";
import { defaultValueEditor, modeEditor, navLeftItems } from './dataCodeUI';

import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI';
import 'react-edit-text/dist/index.css';
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "react-ace-builds/webpack-resolver-min";

import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


function CodeUi() {
    const editor = useRef()
    const [resulCode, setResultCode] = useState('Console ...')
    const [isTestCase, setIsTestCase] = useState(true)
    const [language, setLanguage] = useState("c")
    const [input, setInput] = useState("")
    const [tabType, setTabType] = useState("content")
    const [baiTapCode, setBaiTapCode] = useState({})
    const [testCases, setTestCases] = useState([])

    let params = useParams()

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Lấy dữ liệu bài tập code từ DB
                const getBaiTapCode = async () => {
                    try {
                        const response = await BaiTapLuyenTapAPI.getOne(params.id);
                        setBaiTapCode(response.data);
                    } catch (error) {
                        console.log("Fetch data false ", error);
                    }
                }
                getBaiTapCode();
                // lấy testCase từ DB ( chỉ để hiển thị lên UI không mang theo dữ liệu )
                const getTestCase = async () => {
                    try {
                        const response = await RunCodeAPI.getTestCaseLuyenTapByID(params.id);
                        setTestCases(response.data);
                    } catch (error) {
                        console.log("Fetch data false ", error);
                    }
                }
                getTestCase();
            }
        });

    }, [params.id])

    const handleNavLeft = (value) => {
        setTabType(value);
    }
    function handleClickRunCode() {
        setResultCode("Đang chạy....")
        const data = async () => {
            try {
                const response = await RunCodeAPI.postRunCode({
                    code: editor.current.editor.getValue(),
                    input: input,
                    language: language
                });
                setResultCode(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    }

    const handleClickSubmitCode = () => {
        const submit = async () => {
            setTestCases(testCases.map(() => 3))
            try {
                const response = await RunCodeAPI.postRunCodes({
                    code: editor.current.editor.getValue(),
                    input: input,
                    language: language
                }, params.id);
                setTestCases(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        submit();
    }

    function handleChangeValueDropDownLanguage(e) {
        setLanguage(e.target.value)
        editor.current.editor.setValue(defaultValueEditor[e.target.value])

    }
    const handleSaveInput = ({ name, value, previousValue }) => {
        setInput(value)
    };

    return (
        <div className={styles.Body}>
            <div className={styles.nav_left}>
                {navLeftItems.map(navLeftItem => (
                    <div key={navLeftItem.name} className={tabType === navLeftItem.name ? styles.nav_item_active : styles.nav_item} onClick={() => handleNavLeft(navLeftItem.name)}>
                        <FontAwesomeIcon icon={navLeftItem.icon} className={styles.navLeftItem_icon} />
                    </div>
                ))}
            </div>
            {/* <!-- Nội dung bài tập --> */}
            <div className={styles.content}>
                <h1>{baiTapCode.tieuDe}</h1>
                <div className={styles.question}>
                    <p>
                        {baiTapCode.deBai}
                    </p>
                </div>

                <div className={styles.input_format}>
                    <h2>Định dạng đầu vào</h2>
                    <p> {baiTapCode.dinhDangDauVao}</p>
                </div>

                <div className={styles.contraints}>
                    <h2>Ràng buộc</h2>
                    <p> {baiTapCode.rangBuoc}</p>
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

            </div>


            <div className={styles.code_editor}>

                <div className={styles.option_language}>
                    <select className={styles.selectpicker} onChange={handleChangeValueDropDownLanguage} data-live-search="true" name="Language" id="mode" defaultValue={language}>
                        <option value="c" id="c">C</option>
                        <option value="cpp" id="c++">C++</option>
                        <option value="py" id="python">Python</option>
                        <option value="cs" id="c#">C#</option>
                        <option value="java" id="java">Java</option>
                    </select>
                </div>

                <div className={styles.editor}>
                    <AceEditor
                        ref={editor}
                        defaultValue={defaultValueEditor[language]}
                        mode={modeEditor[language]}
                        theme='one_dark'
                        fontSize='14pt'
                        name="UNIQUE_ID_OF_DIV"
                        height='100%'
                        width='100%'
                        showPrintMargin={false}
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

                    <button className={styles.submit_code} onClick={handleClickSubmitCode} >
                        <span>Nộp Bài</span>
                    </button>
                </div>

                <div className={styles.result}>
                    <div className={styles.navRessult}>
                        <h3 onClick={() => setIsTestCase(true)} className={clsx(styles.navRessult_item, { [styles.isSelect_navRessult]: isTestCase })} >Test case</h3>
                        <h3 onClick={() => setIsTestCase(false)} className={clsx(styles.navRessult_item, { [styles.isSelect_navRessult]: !isTestCase })} >Console</h3>
                    </div>

                    {isTestCase && <div className={styles.result_content}>
                        <ul className={styles.list_testcase}>
                            {
                                testCases.map((testCase, index) => (
                                    <li key={index}>
                                        <div className={styles.case}>
                                            {testCase === 3 ?
                                                <CircularProgress
                                                    size={16}
                                                    sx={{
                                                        marginRight: "8px"
                                                    }} />
                                                : <FontAwesomeIcon
                                                    className={clsx(styles.case_icon, {
                                                        [styles.icon_success]: testCase === 1 || testCase === 2,
                                                        [styles.icon_error]: testCase === 0
                                                    })}
                                                    icon={testCase === 2
                                                        ? faCircle : (testCase === 1
                                                            ? faCircleCheck : faCircleXmark)}
                                                />
                                            }
                                            <span>Test case #{index}</span>
                                        </div>
                                    </li>))
                            }
                        </ul>
                    </div>
                    }

                    {isTestCase ||
                        <div className={styles.consoleScreen}>
                            <div className={styles.consoleContent}>
                                {resulCode}
                            </div>
                            <div className={styles.consoleInput}>
                                <EditTextarea onSave={handleSaveInput} placeholder='Nhập input ...' rows={2} className={styles.inputEdittext} />
                                <button onClick={handleClickRunCode}>Chạy thử</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default CodeUi