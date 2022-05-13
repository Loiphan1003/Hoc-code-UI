import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/ExerciseClassRoom.module.css';



function ExerciseClassRoom(props) {
    return (
        <div className={styles.assignment} >
            <div className={styles.assignment_left} >
                <div className={styles.assignment_left_header} >
                    <FontAwesomeIcon icon={faTableList} />
                    <p>Lập trình hướng đối tượng</p>
                </div>

                <div>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                    <p>Câu hỏi 1</p>
                </div>
            </div>

            <div className={styles.assignment_right} >

            </div>
        </div>
    );
}

export default ExerciseClassRoom;