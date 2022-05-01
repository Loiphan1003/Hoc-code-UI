import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from "./RoomDetail.module.css"


function Draft(props) {
    return (
        <div className={props.type === 'Bài tập' ? styles.courseWork : styles.none} >
            <div className={styles.courseWork_left_content}>
                đây là phân bài tập
            </div>

            <div className={styles.courseWork_right_content}>

                <div className={styles.btn_}>
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" />
                    <p>Tạo bài tập</p>
                </div>

                <div className={styles.btn_} id={styles.find}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                    <input placeholder='Tìm kiếm bài tập' />
                </div>

                <div className={styles.btn_fillter}>
                    <div className={styles.fillter_}>
                        <p>Tìm kiếm theo trạng thái:</p>

                        <div className={styles.status}>
                            <input name='Draft' type="checkbox" value="Nháp" />
                            <label id={styles.draft} htmlFor="Draft">Nháp</label>
                        </div>

                        <div className={styles.status}>
                            <input name='Open' type="checkbox" value="Nháp" />
                            <label id={styles.open} htmlFor="Open">Mở</label>
                        </div>

                        <div className={styles.status} >
                            <input name='Close' type="checkbox" value="Nháp" />
                            <label id={styles.close} htmlFor="Close">Đóng</label>
                        </div>
                    </div>
                    <div className={styles.fillter_type}>
                        <p>Tìm kiếm theo loại bài tập:</p>

                        <div className={styles.type}>
                            <input name='Draft' type="checkbox" value="Nháp" />
                            <label htmlFor="Draft">Trắc nghiệm</label>
                        </div>

                        <div className={styles.type}>
                            <input name='code' type="checkbox" value="code" />
                            <label htmlFor="code">Viết code</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Draft;