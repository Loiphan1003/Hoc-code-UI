import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './couresDetail.module.css';
import CourseApi from '../../apis/courseApi';
// import Course from '../../components/theory/Course';

function CouresDetail(props) {

    const navigate = useNavigate();
    const [coures, setCoures] = useState([]);
    // const [id, setId] = useState('');
    let params = useParams()

    useEffect(() => {
        const getTheoryLection = async () => {
            try {
                const response = await CourseApi.getOne(params.courseID);
                setCoures(response.data);
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }
        getTheoryLection();
    }, [])

    const handleClick = (name) => {
        navigate('/couredetail/section');
    }

    return (
        <>
            <Header data={props.data} />
            <div className={styles.couresDetail}>
                <div className={styles.couresDetailTitle}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <h1>Chương trình C cho người bắt đầu</h1>
                </div>

                <ul className={styles.couresDetailList}>
                    {coures.map(coure => (
                        <li key={coure.id} className={styles.coure} onClick={() => handleClick(coure.name)}>{coure.name}</li>
                    ))}

                </ul>
            </div>
        </>
    );
}

export default CouresDetail;