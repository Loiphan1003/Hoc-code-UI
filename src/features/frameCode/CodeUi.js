import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircle, faCircleCheck, faCircleXmark, faAlignLeft, faRankingStar, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './CodeUi.module.css';
import AceEditor from "react-ace";
import RunCodeAPI from '../../apis/runCodeAPI';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
// import * as ace from 'ace-builds'
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import "react-ace-builds/webpack-resolver-min";


function CodeUi() {

    const defaultValueEditor = {
        "c": "#include <stdio.h> \n\n\n int main() {\n    // Complete the code.\n    return 0;\n}\n",
        "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n",
        "java": "import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n",
        "py": "# Enter your code here. Read input from STDIN. Print output to STDOUT",
        "cs": "using System;\nnamespace HelloWorld\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tConsole.WriteLine(\"Hello World!\");\n\t\t}\n\t}\n}"
    }
    const modeEditor = {
        "c": "c_cpp",
        "cpp": "c_cpp",
        "java": "java",
        "py": "python",
        "cs": "csharp"
    }

    const editor = useRef()
    const [resulCode, setResultCode] = useState('Console ...')
    const [isTestCase, setIsTestCase] = useState(true)
    const [language, setLanguage] = useState("c")
    const [input, setInput] = useState("")
    const [tabType, setTabType] = useState("content")
    const [baiTapCode, setBaiTapCode] = useState({})
    const [testCases, setTestCases] = useState([])
    // const [outputValue, setOutputValue] = useState("");
    let params = useParams()

    const navLeftItems = [
        {
            icon: faAlignLeft,
            name: "content"
        },
        {
            icon: faRankingStar,
            name: "rank"
        },
        {
            icon: faClock,
            name: "history"
        }
    ]

    useEffect(() => {
        // Lấy dữ liệu bài tập code từ DB
        const getBaiTapCode = async () => {
            try {
                const response = await BaiTapCodeAPI.getOne(params.id);
                setBaiTapCode(response.data);
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }
        getBaiTapCode();
        // lấy testCase từ DB ( chỉ để hiển thị lên UI không mang theo dữ liệu )
        const getTestCase = async () => {
            try {
                const response = await RunCodeAPI.getTestCaseByID(params.id);
                setTestCases(response.data);
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }
        getTestCase();

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
                setResultCode(response.data.output);
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

    // console.log(input)

    return (
        <div className={styles.content_body}>

            <div className={styles.header}>
                <FontAwesomeIcon className={styles.headerIcon} icon={faChevronLeft} size="2x" />
                <h3>{baiTapCode.tieuDe}</h3>
            </div>

            <div className={styles.Body}>

                <div className={styles.nav_left}>

                    {navLeftItems.map(navLeftItem => (
                        <div key={navLeftItem.name} className={tabType === navLeftItem.name ? styles.nav_item_active : styles.nav_item} onClick={() => handleNavLeft(navLeftItem.name)}>
                            <FontAwesomeIcon icon={navLeftItem.icon} size="2x" />
                        </div>
                    ))}
                </div>

                <div className={styles.content} dangerouslySetInnerHTML={{ __html: baiTapCode.deBai }} >
                    {/* <!-- Nội dung bài tập --> */}
                    {/* <div className={styles.question}>
                        <p>
                            Từ một thanh thép có độ dài là một số nguyên dương N cho trước
                            Người ta cho phép có thể cắt thành nhiều đoạn (đều có độ dài là số nguyên dương).
                            Hãy cho biết giá trị TÍCH số lớn nhất của tất cả các các đoạn con tạo ra?
                        </p>
                    </div> */}

                    {/* <div className={styles.input_format}>
                        <h2>Input Format</h2>
                        <p> Dòng duy nhất chứa số nguyên dương N</p>
                    </div>

                    <div className={styles.contraints}>
                        <h2>Contraints</h2>
                        <p> 1 &lt= N &lt= 78</p>
                    </div>

                    <div className={styles.ouput_format}>
                        <h2>Output Format</h2>
                        <p> 1 dòng duy nhất chứa tích lớn nhất tìm được</p>
                    </div>

                    <div className={styles.sample_input}>
                        <h2>Sample Input</h2>
                        <p>5<br />10</p>
                    </div>

                    <div className={styles.sample_output}>
                        <h2>Sample Ouput</h2>
                        <p>105<br />10<br />10<br />10</p>
                    </div> */}
                </div>

                <div className={styles.code_editor}>

                    <div className={styles.option_language}>
                        <select className={styles.selectpicker} onChange={handleChangeValueDropDownLanguage} data-live-search="true" name="Language" id="mode" defaultValue={language}>
                            <option value="c" id="c">C</option>
                            <option value="c++" id="c++">C++</option>
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
                            fontSize='12pt'
                            name="UNIQUE_ID_OF_DIV"
                            width='100%'
                            height='645px'
                            showPrintMargin={false}
                            // enableSnippets= {true}
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
                            {/* <i class="fa-solid fa-floppy-disk"></i> */}
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
                                                <FontAwesomeIcon
                                                    className={clsx(styles.case_icon, {
                                                        [styles.icon_success]: testCase === 1 || testCase === 2 || testCase === 3,
                                                        [styles.icon_error]: testCase === 0
                                                    }
                                                    )}
                                                    icon={testCase === 2
                                                        ? faCircle : (testCase === 1
                                                            ? faCircleCheck : testCase === 0
                                                                ? faCircleXmark : "")} />
                                                {testCase === 3 &&<CircularProgress
                                                    className={styles.icon_load}
                                                    size={15}
                                                />}
                                                <span>Test case #{index}</span>
                                            </div>
                                        </li>))
                                }
                            </ul>
                        </div>}

                        {isTestCase ||
                            <div className={styles.consoleScreen}>
                                <div className={styles.consoleContent}>
                                    {resulCode}
                                </div>
                                <div className={styles.consoleInput}>
                                    <EditTextarea onSave={handleSaveInput} placeholder='Nhập input ...' rows={2} className={styles.inputEdittext} />
                                    <button onClick={handleClickRunCode}>Chạy thử</button>
                                </div>
                            </div>}
                    </div>

                    {/* Mobile: */}
                    <div className={styles.button}>
                        <button className={styles.btn} >Nộp bài</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CodeUi