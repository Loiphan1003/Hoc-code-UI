import React from 'react';
import styles from './CouresSection.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import test1 from '../../../images/test1.png';
import test2 from '../../../images/test2.png';


function CouresDetailSection(props) {
    return (
        <div>
            <div className={styles.header}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <h1>Bài 1: Khái niệm về biến</h1>
            </div>

            <div className={styles.content}>
                <p><span className={styles.textH1}>Khái niệm:</span><br/>
                    Một biến trong C không là gì nhưng là một tên được đưa ra đến bộ nhớ lưu trữ để chương trình có thể thao tác. Mỗi biến trong C có một kiểu xác định, để xác định cỡ và layout cho bộ nhớ biến đó. Phạm vi của giá trị có thể được dự trữ trong bộ nhớ, việc thiết lập các biểu thức có thể được áp dụng với biến. </p>
                <img src={test2} className={styles.content_img} alt="courser_image"/>
                <img src={test1} className={styles.content_img} alt="courser_image"/>
            </div>
        </div>
    );
}

export default CouresDetailSection;