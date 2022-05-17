import React, {useState} from 'react';
import AceEditor from 'react-ace-builds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
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

    const handleRunCode = () => {
        setOpenTestCase(true);
    }

    return (
        <div className={styles.code} >
            <h2>Câu hỏi {data.index}</h2>
            <h3>Đề câu hỏi</h3>

            <div className={styles.code_section} >
                <AceEditor 
                    // ref={editor}
                    // defaultValue={defaultValueEditor[language]}
                    mode="c_cpp"
                    theme='one_dark'
                    fontSize='12pt'
                    name="UNIQUE_ID_OF_DIV"
                    width='73%'
                    // height='50%'
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
                        <div className={styles.testcase_btn} onClick={() => setOpenTestCase(!openTestCase)} >
                            <FontAwesomeIcon icon={faChevronDown} />
                            <p>Test case</p>
                        </div>
                        <button onClick={() => handleRunCode()} >Chạy</button>
                        <button>Nộp bài</button>
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