import React, {useState} from 'react';
import AceEditor from 'react-ace-builds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faChevronUp, faCircle } from '@fortawesome/free-solid-svg-icons';
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import "react-ace-builds/webpack-resolver-min";
import styles from './styles/TestCode.module.css';


function TestCode({data}) {

    const [openTestCase, setOpenTestCase] = useState(false);
    const [baiTapCode,setBaiTapCode] = useState({});
    const handleRunCode = () => {
        setOpenTestCase(true);
    }

    return (
        <div className={styles.code} >
            <h2>Câu hỏi {data.index}</h2>
            <div className={styles.content}>
                <h1> Tìm số lớn nhất{baiTapCode.tieuDe}</h1>
                    <div className={styles.question}>
                    <p>
                    Cho 2 số tìm ra số lớn nhất
                    {baiTapCode.deBai}
                    </p>
                </div>

                <div className={styles.input_format}>
                    <h2>Định dạng đầu vào</h2>
                    <p> Đầu vào là 2 số {baiTapCode.dinhDangDauVao}</p>
                </div>

                <div className={styles.contraints}>
                    <h2>Ràng buộc</h2>
                    <p> Có thế thôiia {baiTapCode.rangBuoc}</p>
                </div>

                <div className={styles.ouput_format}>
                    <h2>Định dạng đầu ra</h2>
                    <p> ádfasdfasdf{baiTapCode.dinhDangDauRa}</p>
                </div>

                <div className={styles.sample_input}>
                    <h2>Đầu vào mẫu</h2>
                    <div>ádfasdf{baiTapCode.mauDauVao}</div>
                </div>

                <div className={styles.sample_output}>
                    <h2>Đầu ra mẫu</h2>
                    <div>ádfasdfasdf{baiTapCode.mauDauRa}</div>
                </div>
            </div>

            <div className={styles.code_section} >
                <AceEditor 
                    // ref={editor}
                    // defaultValue={defaultValueEditor[language]}
                    mode="c_cpp"
                    theme='one_dark'
                    fontSize='12pt'
                    name="UNIQUE_ID_OF_DIV"
                    width='70%'
                    height='400px'
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

                <div className={styles.testcase_section} >
                    <div className={styles.testcase_header} >
                        <div className={styles.testcaseTitle} onClick={() => setOpenTestCase(!openTestCase)} >
                            {openTestCase ? <FontAwesomeIcon icon={faChevronUp}/>
                            : <FontAwesomeIcon icon={faChevronDown} />}
                            <p>Test case</p>
                        </div>
                        <div className={styles.twoButon}>
                            
                            <button onClick={() => handleRunCode()} >Chạy</button>
                            <button>Nộp bài</button>
                        </div>
                        
                    </div>

                    {openTestCase ? <div className={styles.testcase_list} >

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>


                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>

                        <div className={styles.testcase_item} >
                            <FontAwesomeIcon icon={faCircle} />
                            <p>#TestCase 0</p>
                        </div>
                    </div> : ''}
                </div>
            </div>


        </div>
    );
}

export default TestCode;