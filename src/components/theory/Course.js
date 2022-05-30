import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styles from './styles/Theory.module.css';
import image from '../../images/C-programming 1.png'


function Course({data}) {

    // let params = useParams();

    return (
        <div className={styles.listCourse}>
            {data.map( monHoc => (
                <NavLink to={`/theory/coureDetail/${monHoc.id}`} key={monHoc.id} className={styles.course}>
                    <img src={image} alt='imageCourse' />
                    <div>
                        <h3 className={styles.title}>{monHoc.tenMonHoc}</h3>
                        <p className={styles.discription}>{monHoc.moTa}</p>
                        <div className={styles.line}></div>
                        <p className={styles.kind}>Miễn phí</p>
                    </div>
                </NavLink>)
            )}
        </div>
    );
}

export default Course;