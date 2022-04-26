import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleCheck, faCircleXmark, faSpinner, faAlignLeft, faRankingStar, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './CodeUi.module.css';
import axios from 'axios';
import AceEditor from "react-ace";
// import * as ace from 'ace-builds'
// import "ace-builds/src-noconflict/theme-one_dark";
// import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-one_dark";
// import "react-ace-builds/webpack-resolver-min";


function CodeUi() {

    const [code, setCode] = useState('');
    // const [navLeftSelector, setNavLeftSelector] = useState('');
    const [programming, setProgramming] = useState('c');
    // const [outputValue, setOutputValue] = useState("");

    const handleNavLeft = () => {

    }

    // const createExecutionRequest = () => {
    //     // setTakeInput(false);
    //     // setExecuting(true);
    //     var data = {
    //         code: code,
    //         language: 'py',
    //         input: ''
    //     };

    //     var config = {
    //         method: "post",
    //         url:"https://codexweb.netlify.app/.netlify/functions/enforceCode",
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //             'Content-Type': "application/json"
    //         },
    //         // header.Add("Access-Control-Allow-Origin", "*"),

    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             // setExecuting(false);
    //             setOutputValue(response.data.output);
    //         })
    //         .catch(function (error) {
    //             // setExecuting(false);
    //             setOutputValue("Network Error");
    //         });
    // };

    // console.log("Outputvalue: ", outputValue);


    return (
        <div className={styles.content_body}>

            <div className={styles.header}>
                <FontAwesomeIcon className={styles.headerIcon} icon={faChevronLeft} size="2x" />
                <h3>Số nguyên tố</h3>
            </div>

            <div className={styles.Body}>
                <div className={styles.nav_left}>
                    <div className={styles.nav_item} onClick={handleNavLeft}>
                        <FontAwesomeIcon icon={faAlignLeft} size="2x" />
                    </div>
                    <div className={styles.nav_item} onClick={handleNavLeft}>
                        <FontAwesomeIcon icon={faRankingStar} size="2x" />
                    </div>
                    <div className={styles.nav_item} onClick={handleNavLeft}>
                        <FontAwesomeIcon icon={faClock} size="2x" />
                    </div>

                </div>

                <div className={styles.content}>
                    {/* <!-- Nội dung bài tập --> */}
                    <div className={styles.question}>
                        <p>
                            Từ một thanh thép có độ dài là một số nguyên dương N cho trước
                            Người ta cho phép có thể cắt thành nhiều đoạn (đều có độ dài là số nguyên dương).
                            Hãy cho biết giá trị TÍCH số lớn nhất của tất cả các các đoạn con tạo ra?
                        </p>
                    </div>

                    <div className={styles.input_format}>
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
                    </div>
                </div>

                <div className={styles.code_editor}>
                    <div className={styles.option_language}>
                        <select className={styles.selectpicker} data-live-search="true" name="Language" id="mode" defaultValue={programming}>
                            <option value="c" id="c">C</option>
                            <option value="c++" id="c++">C++</option>
                            <option value="python2" id="python2">Python2</option>
                            <option value="python3" id="python3">Python3</option>
                            <option value="java" id="java">Java</option>
                        </select>
                    </div>
                    <div className={styles.editor}>
                        <AceEditor
                            className={styles.code}
                            mode="c_cpp"
                            theme='one_dark'
                            onChange={setCode}
                            fontSize='12pt'
                            name="UNIQUE_ID_OF_DIV"
                            width='100%'
                            showPrintMargin={false}
                            // enableSnippets= {true}
                            editorProps={{
                                $blockScrolling: true,
                            }}
                            setOptions={{

                                // enableBasicAutocompletion: true,
                                // enableLiveAutocompletion: false,
                                // highlightActiveLine: true,
                            }}

                        />


                        {/* <div className={styles.editor__wrapper}>
                            <div className={styles.editor__body}>
                                <div id={styles.editorCode} className={styles.editor__code}></div>
                            </div>
                        </div> */}
                        <button className={styles.submit_code} >
                            {/* <i class="fa-solid fa-floppy-disk"></i> */}
                            <span>Nộp Bài</span>
                        </button>
                    </div>
                    <div className={styles.result}>
                        <h3>TEST CASE</h3>

                        <div className={styles.result_content}>
                            <ul className={styles.list_testcase}>
                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_success} icon={faCircleCheck} />
                                        <span>Test case #1</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_success} icon={faCircleCheck} />
                                        <span>Test case #2</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_success} icon={faCircleCheck} />
                                        <span>Test case #3</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faCircleXmark} />
                                        <span>Test case #4</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #5</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #6</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #7</span>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #8</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #9</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #10</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.case}>
                                        <FontAwesomeIcon className={styles.icon_error} icon={faSpinner} />
                                        <span>Test case #11</span>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CodeUi