import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircle, faBook } from '@fortawesome/free-solid-svg-icons';
import TestMutipleQuestion from './TestMutipleQuestion';
import TestCode from './TestCode';
import styles from './styles/Test.module.css';
import FlagIcon from '@mui/icons-material/Flag';
import DeKiemTraAPI from '../../apis/deKiemTraAPI';
import Button from '@mui/material/Button';
import ResultView from './ResultView';


function Test(props) {

    const [collapse, setCollapse] = useState(false);
    const [select, setSelect] = useState();
    const [test,setTest] = useState({});
    const [questions,setQuestions] = useState([]);
    const [resultView,setResultView] = useState(false);

    useEffect(() => {
        const getBaiKiemTra = async ()=>{
            const response = await DeKiemTraAPI.getOneById(10);
            setTest(response.data);
            setQuestions(response.data.listCauHoi)
        }

        getBaiKiemTra();
    }, []);

    const handleSelect = (index) => {
        setSelect(questions.at(index));
    }
    return (
        <div className={styles.test} >
            <div className={collapse === true ? styles.left_frame_collapse : styles.left_frame} >
                <div className={collapse === true ? styles.left_container_collapse : styles.left_container} >
                    <div className={collapse === true ? styles.none : styles.left_header} >
                        <h3>Thông tin bài tập</h3>
                        <div className={styles.left_name} >
                            <FontAwesomeIcon icon={faBook} />
                            <p>{test.moTa}</p>
                        </div>
                        <div className={styles.left_line} ></div>
                    </div>
                    <div className={collapse === true ? styles.left_question_collapse : styles.left_question} >
                    { collapse && <div className={collapse === true ? styles.question_item_collapse :styles.question_item} >
                        <FlagIcon sx={{color:"#81d671"}}/>
                        <div className={styles.left_line} ></div>
                    </div>}
                        { questions.map((data, index) => (
                            <div className={collapse === true ? styles.question_item_collapse :styles.question_item} key={index} onClick={() => handleSelect(index)}  >
                                
                                <p>{collapse === true ? 'C'+(data.stt) : `Câu hỏi ${data.stt}`}</p>
                                <div className={collapse === true ? styles.none : styles.question_discription} >
                                    Câu hỏi {data.loaiCauHoi === 0 ? 'trắc nghiệm' :'code' }, {data.diem} điểm
                                </div>
                                <div className={styles.left_line} ></div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.left_line} ></div>
                    <div className={styles.btn_collapse} onClick={() => setCollapse(p => !p)} >
                        <FontAwesomeIcon icon={collapse === true ? faChevronRight : faChevronLeft} />
                       { collapse || <p>Thu hẹp</p>  }
                    </div>
                </div>
            </div>


            <div className={styles.right_container} >

                <div className={styles.right_header} >
                   <div>
                        <h1>{test.moTa}</h1>
                        <Button sx={{position: 'absolute',top: '16px',right: '45px', backgroundColor: '#66d551'}} variant="contained"
                            onClick={() => setResultView(true)}>
                            Nộp bài
                        </Button>
                   </div>
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
                            <p>{test.ngayBatDau}</p>
                        </div>

                        <div className={styles.header_items_list} >
                            <h3>Ngày kết thúc</h3>
                            <p>{test.ngayKetThuc}</p>
                        </div>

                        <div className={styles.header_items_list} >
                            <h3>Tổng câu hỏi</h3>
                            <p>{questions.length}</p>
                        </div>
                    </div>
                    
                </div>

                <div className={styles.right_content} >
                    {(!!select && !resultView) &&  (select.loaiCauHoi === 0  ? <TestMutipleQuestion data={select} /> :  <TestCode data={select} />  ) }
                    { resultView && <ResultView></ResultView> }
                </div>

            </div>
        </div>
    );
}

export default Test;