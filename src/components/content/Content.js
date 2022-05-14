import React, { useState, useRef } from "react";
import AceEditor from "react-ace";
import RunCodeAPI from "../../apis/runCodeAPI";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import "react-ace-builds/webpack-resolver-min";

// import Footer from '../footer/Footer';
import styles from './Content.module.css';
import Backdrop from '../Backdrop';
import Login from '../Login/Login';
import SignUp from './SignUp';
import { image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, imghead } from './export';

function Content(props) {

    const [studentSignUp, setStudentSignUp] = useState(false);
    const [login, setLogin] = useState(false);
    const [language, setLanguage] = useState("c");
    const [input, setInput] = useState("");
    const [resultCode, setResultCode] = useState();
    const [programming, setProgramming] = useState('c');


    const editor = useRef();

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

    function handleChangeValueDropDownLanguage(e) {
        setLanguage(e.target.value)
        editor.current.editor.setValue(defaultValueEditor[e.target.value])
    }

    return (
        <React.Fragment>
            <div className={styles.Content}>
                <div className={styles.first_content}>

                    <div className={styles.left_content}>
                        <div className={styles.left_content_button} >
                            <div className={styles.button} >
                                <div className={styles.group1} >
                                    <h2>Giảng Viên</h2>
                                    <span>Tạo và quản lý lớp học</span>
                                    <span>Thêm mới bài tập</span>
                                </div>
                                <button className={styles.button_login_content} onClick={() => setLogin(true)} >Đăng nhập</button>
                                <p>Tạo mới miễn phí</p>
                            </div>

                            <div className={styles.button_student} >
                                <div className={styles.group1} >
                                    <h2>Sinh viên</h2>
                                    <span>Tham gia các lớp học</span>
                                    <span>Luyện tập và tiếp thu kiến thức</span>
                                </div>

                                <button className={styles.button_login_content} >Đăng nhập</button>
                                <div className={styles.group2} >
                                    <span>Chưa có tài khoản sinh viên</span>
                                    <p onClick={() => setStudentSignUp(true)} >Tạo mới miễn phí</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img className={styles.right_content} alt="hình anhe" src={imghead} />
                </div>

                <div className={styles.seccond_content}>

                    <h1>Lộ trình trở thành lập trình viên</h1>
                    <div className={styles.seccond_content_logoList} >

                        <div className={styles.seccond_content_item} >
                            <img src={image_1} alt="Học lập trình" />
                            <h3>Học lập trình</h3>
                            <p className={styles.seccond_content_discription} >Học lập trình từ cơ bản đến nâng cao thông qua lớp học</p>
                        </div>

                        <div className={styles.seccond_content_item} >
                            <img src={image_2} alt="Luyện lập trình" />
                            <h3>Luyện lập trình</h3>
                            <p className={styles.seccond_content_discription} >Luyện lập trình hằng ngày với nghìn bài tập lớn nhỏ</p>
                        </div>

                        <div className={styles.seccond_content_item} >
                            <img src={image_3} alt="Thi lập trình" />
                            <h3>Thi lập trình</h3>
                            <p className={styles.seccond_content_discription} >Tham gia các cuộc thi và cải thiện kỹ năng lập trình</p>
                        </div>

                        <div className={styles.seccond_content_item} >
                            <img src={image_4} alt="Tìm hiểu lập trình" />
                            <h3>Tìm hiểu lập trình</h3>
                            <p className={styles.seccond_content_discription} >Tìm hiểu kiến thức lập trình thông qua chia sẻ từ các chuyên gia</p>
                        </div>
                    </div>
                </div>

                <div className={styles.three_content} >
                    <h1>CodeSample ưu điểm vượt trội</h1>
                    <div className={styles.three_content_main} >
                        <img src={image_5} alt="giao dien lam bài" />
                        <ul className={styles.three_content_list_info} >
                            <li>
                                <img src={image_6} alt="Hệ thống" />
                                <p>Hệ thống mạnh mẽ hiện đại</p>
                            </li>

                            <li>
                                <img src={image_7} alt="Nội dung" />
                                <p>Nội dung dễ hiểu chi tiết</p>
                            </li>

                            <li>
                                <img src={image_8} alt="Hấp dẫn" />
                                <p>Hấp dẫn thu hút</p>
                            </li>

                            <li>
                                <img src={image_9} alt="Cộng đồng" />
                                <p>Cộng đồng đông đảo</p>
                            </li>

                            <li>
                                <img src={image_10} alt="Đội ngũ" />
                                <p>Đội ngũ nhiệt tình, có chuyên môn</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.four_content} >

                    <div className={styles.code_editor} >

                        <div className={styles.option_language}>
                            <select className={styles.selectpicker} onChange={handleChangeValueDropDownLanguage} data-live-search="true" name="Language" id="mode" defaultValue={programming}>
                                <option value="c" id="c">C</option>
                                <option value="c++" id="c++">C++</option>
                                <option value="py" id="python">Python</option>
                                <option value="cs" id="c#">C#</option>
                                <option value="java" id="java">Java</option>
                            </select>
                        </div>

                        <div className={styles.frameCode} >
                            {/* <div className={styles.code} > */}
                            <AceEditor
                                ref={editor}
                                defaultValue={defaultValueEditor[language]}
                                mode={modeEditor[language]}
                                theme='one_dark'
                                fontSize='12pt'
                                name="UNIQUE_ID_OF_DIV"
                                width='50%'
                                height='500px'
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
                            {/* </div> */}


                            <div className={styles.code_output} >
                                <p>Kết quả:</p>
                                {resultCode}
                            </div>
                        </div>

                        <button className={styles.run_code} onClick={handleClickRunCode} >
                            Chạy
                        </button>
                    </div>
                    <div className={styles.four_content_discription} >
                        <h2>Bắt đầu học code chỉ trong vài giây</h2>
                        <p>
                            Môi trường học tập thực hành của chúng tôi có nghĩa là bạn sẽ viết mã thực từ bài học đầu tiên của mình
                        </p>
                    </div>
                </div>
            </div>
            {login && <Backdrop onClick={() => setLogin(false)} />}
            {login && <Login />}
            {studentSignUp && <SignUp close={setStudentSignUp} />}
        </React.Fragment>

    )
}

export default Content;