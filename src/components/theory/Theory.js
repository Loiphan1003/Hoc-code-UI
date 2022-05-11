import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Course from './Course';
import CourseAdvanced from './CourseAdvanced';
import image1 from '../../images/headerTheory.png';
import styles from './Theory.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Theory(props) {



    return (
        <div>
            <div className={styles.theory}>
                <div className={styles.theoryHeader} src={image1}>
                    <div className={styles.theoryHeaderLeft}>
                        <h1>Tìm hiểu lý thuyết cùng CODE SAMPLE</h1>
                        <div className={styles.findTheory}>
                            <input type='text' className={styles.nameTheory} placeholder='Nhập nội dung tìm kiếm' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                    <img src={image1} alt='imageHeaderTheory' />
                </div>

                <div className={styles.container}>

                    <div className={styles.kienthuccoso}>
                        <h1>Kiến thức cơ sở</h1>
                        <Course />
                    </div>

                    <div className={styles.kienthucnangcao}>
                        <h1>Kiến thức nâng cao</h1>
                        <CourseAdvanced />
                    </div>
                </div>


            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Theory;