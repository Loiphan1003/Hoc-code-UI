import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircle, faBook } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import TestMutipleQuestion from './TestMutipleQuestion';
import TestCode from './TestCode';
import styles from './styles/Test.module.css';



function Test(props) {

    const [collapse, setCollapse] = useState('false');
    const [select, setSelect] = useState();

    const dataTest = [
        { id: 1, name: "câu hỏi 1", type: "code", score: 2 },
        { id: 2, name: "câu hỏi 2", type: "mutiple question" },
        { id: 3, name: "câu hỏi 3", type: "code" },
        { id: 4, name: "câu hỏi 4", type: "mutiple question" },
        { id: 5, name: "câu hỏi 5", type: "code" },
        { id: 6, name: "câu hỏi 1", type: "code", score: 2 },
        { id: 7, name: "câu hỏi 2", type: "mutiple question" },
        { id: 8, name: "câu hỏi 3", type: "code" },
        { id: 9, name: "câu hỏi 4", type: "mutiple question" },
        { id: 190, name: "câu hỏi 5", type: "code" },
        { id: 11, name: "câu hỏi 5", type: "code" },
        { id: 12, name: "câu hỏi 5", type: "code" }
    ]

    const handleSelect = (id, index) => {

        const value = dataTest.find(i => i.id === id);
        value["index"] = index;
        setSelect(value);
        console.log(value);
    }

    return (
        <div className={styles.test} >
            <div className={collapse === true ? styles.left_frame_collapse : styles.left_frame} >
                <div className={collapse === true ? styles.left_container_collapse : styles.left_container} >
                    <div className={collapse === true ? styles.none : styles.left_header} >
                        <h3>Thông tin bài tập</h3>

                        <div className={styles.left_name} >
                            <FontAwesomeIcon icon={faBook} />
                            <p>Bài kiểm tra số 1</p>
                        </div>

                        <div className={styles.left_time} >
                            <FontAwesomeIcon icon={faClock} />
                            <p>Kết thúc lúc: 09:00AM 20/05/2022</p>
                        </div>
                        <div className={styles.left_line} ></div>
                    </div>

                    <div className={collapse === true ? styles.left_question_collapse : styles.left_question} >

                        {dataTest.map((data, index) => (
                            <div className={styles.question_item} key={index} onClick={() => handleSelect(data.id, index + 1)}  >
                                <p>{collapse === true ? (index + 1) : `Câu hỏi ${index + 1}`}</p>
                                <div className={collapse === true ? styles.none : styles.question_discription} >
                                    Câu hỏi {data.type}, {data.score} điểm
                                </div>
                                <div className={styles.left_line} ></div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.btn_collapse} onClick={() => setCollapse(!collapse)} >
                        <FontAwesomeIcon icon={collapse === true ? faChevronRight : faChevronLeft} />
                        <p>{collapse === true ? "" : "Thu hẹp"}</p>
                    </div>
                </div>
            </div>


            <div className={styles.right_container} >

                <div className={styles.right_header} >
                    <h1>Bài kiểm tra số 1</h1>
                    <div className={styles.header_list} >
                        <div className={styles.header_items_list} >
                            <h3>Trạng thái</h3>
                            <div className={styles.header_status} >
                                <FontAwesomeIcon className={styles.status_icon_open} icon={faCircle} size='2xs' />
                                <p>Mở</p>
                            </div>
                        </div>

                        <div className={styles.header_items_list} >
                            <h3>Ngày bắt đầu</h3>
                            <p>07:30 AM 20/05/2022</p>
                        </div>

                        <div className={styles.header_items_list} >
                            <h3>Ngày kết thúc</h3>
                            <p>09:00 AM 20/05/2022</p>
                        </div>

                        <div className={styles.header_items_list} >
                            <h3>Tổng câu hỏi</h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>

                <div className={styles.right_content} >
                    {select !== undefined ? (select.type === 'code' ? <TestCode data={select} /> : <TestMutipleQuestion data={select} /> ) : <div></div> }
                </div>

            </div>
        </div>
    );
}

export default Test;