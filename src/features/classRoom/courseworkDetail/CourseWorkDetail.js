import React from "react";
import styles from './CourseWorkDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import {useParams} from 'react-router-dom'

function CourseWorkDetail() {
    let params = useParams(); 

    return(
        <div>
            <div className={styles.courseworkdetail_content_item}>
                <div className={styles.item_info}>
                    <FontAwesomeIcon icon={faTableList}/>
                    <div className={styles.header_coursedetail}>
                        <h1>{params.couredetailsName}</h1>
                    </div>
                    <div className={styles.header_background_coursedetail}>
                        <span>DRAFT</span>
                    </div>
                </div>
                <button type="button" className={styles.LichTrinh} >Lịch trình</button>
            </div>
            <div className={styles.courseworkdetail_content_item2}>
                <div className={styles.courseworkdetail_textSUBMISSIONS}>
                    <span className={styles.courseworkdetail_textSUBMISSIONS_header}>SUBMISSIONS</span>
                    <br></br>
                    <span>Unlimited</span>
                </div>
                <div className={styles.courseworkdetail_textGRADINGSTRATEGY}>
                    <span className={styles.courseworkdetail_textGRADINGSTRATEGY_header}>GRADING STRATEGY</span>
                    <br></br>
                    <span>Best Submission</span>
                </div>
            </div>
            <hr></hr>
            <div className={styles.Tree}>
                <div className={styles.courseworkdetail_content_Total}>
                    <h3>Total Submissions</h3>
                </div>
                {/* <div>
                    <span className={styles.Complete_content}>
                        <span className={styles.Node1}></span>
                        <span className={styles.Complete}>Complete</span>
                    </span>
                    <span className={styles.Complete_content}>
                        <span className={styles.Node2}></span>
                        <span className={styles.Complete}>In Progress</span>
                    </span>
                    <span className={styles.Complete_content}>
                        <span className={styles.Node3}></span>
                        <span className={styles.Complete}>Not Started</span>
                    </span>
                </div> */}
                {/* <br></br> */}
                <div>
                    <div className={styles.Total1}>
                        <span className={styles.PhanTram}>0%</span>
                        <label className={styles.Lable}>LOWEST GRADE</label>
                    </div>
                    <div className={styles.Total1}>
                        <span className={styles.PhanTram}>0%</span>
                        <label className={styles.Lable}>MEDIAN</label>
                    </div>
                    <div className={styles.Total1}>
                        <span className={styles.PhanTram}>0%</span>
                        <label className={styles.Lable}>HIGHEST GRADE</label>
                    </div>
                    <div className={styles.Total1}>
                        <span className={styles.PhanTram}>0%</span>
                        <label className={styles.Lable}>AVERAGE</label>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default CourseWorkDetail;