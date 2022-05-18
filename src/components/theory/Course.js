import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Theory.module.css';
import image from '../../images/C-programming 1.png'


function Course(props) {

    let params = useParams();
    console.log(params.couredetailID);


    return (
        <div className={styles.listCourse}>
            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>

            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>
            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>

            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>

            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>

            <div className={styles.course}>
                <img src={image} alt='imageCourse' />
                <div>
                    <h3 className={styles.title}>C cho người mới bắt đầu</h3>
                    <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                    <div className={styles.line}></div>
                    <p className={styles.kind}>Miễn phí</p>
                </div>
            </div>
        </div>
    );
}

export default Course;