import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CourseApi from '../../apis/courseApi';

import styles from './Theory.module.css';
import image from '../../images/C-programming 1.png';
// import { async } from '@firebase/util';

function CourseAdvanced() {

    // const navigate = useNavigate();
    const [coures, setCoures] = useState([]);
    // const [id, setId] = useState('');


    useEffect(() => {
      
        const data = async () => {
            try {
                const response = await CourseApi.getAll();
                setCoures(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
        // return ()=> data();
    }, [])


    return (
        <div className={styles.listCourse}>

            {coures.map(coure => (
                <NavLink to={`/theory/coureDetail/${coure.id}`} key={coure.id} className={styles.course}    >
                    <img src={image} alt='imageCourse' />
                    <div>
                        <h3 className={styles.title}>{coure.name}</h3>
                        <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                        <div className={styles.line}></div>
                        <p className={styles.kind}>Miễn phí</p>
                    </div>
                </NavLink>

            ))}

        </div>
    );
}

export default CourseAdvanced;