import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import styles from './Theory.module.css';
import image from '../../images/C-programming 1.png';

function CourseAdvanced() {

    const navigate = useNavigate();
    const [coures, setCoures] = useState([]);
    // const [id, setId] = useState('');


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(function (response) {
                return response.json()
            })
            .then(function (response) {
                setCoures(response)
            })
    }, [])

    const handdleClick = (id) => {
        navigate('/coureDetail');
    }


    return (
        <div className={styles.courseAdvancedList}>

            {coures.map(coure => (
                <div key={coure.id} >
                    <div className={styles.course} onClick={() => handdleClick(coure.id)}   >
                        <img src={image} alt='imageCourse' />
                        <div>
                            <h3 className={styles.title}>{coure.name}</h3>
                            <p className={styles.discription}>Khóa học lập trình C cho người mới bắt đầu khóa học này sẽ cung cấp kiến thức</p>
                            <div className={styles.line}></div>
                            <p className={styles.kind}>Miễn phí</p>
                        </div>
                    </div>
                </div>

            ))}
            {/* {console.log(document.getElementsByClassName(styles.course))} */}

        </div>
    );
}

export default CourseAdvanced;