import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './couresDetail.module.css';
import LyThuyetAPI from '../../apis/lyThuyetAPI';

function CouresDetail(props) {

    const navigate = useNavigate();
    const [coures, setCoures] = useState([]);
    // const [id, setId] = useState('');
    let params = useParams()

    useEffect(() => {
        const getTheoryLection = async () => {
            try {
                const response = await LyThuyetAPI.getAll(params.courseID);
                setCoures(response.data);
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }
        getTheoryLection();
    }, [params.courseID])

    const handleClick = (name) => {
        navigate('/couredetail/section');
    }

    return (
        <>
            <div className={styles.couresDetail}>
                <div className={styles.couresDetailTitle}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <h1>Chương trình C cho người bắt đầu</h1>
                </div>

                <ul className={styles.couresDetailList}>
                    {coures.map(coure => (
                        <NavLink key={coure.id} to={`/couredetail/section/${coure.id}`} className={styles.coure} >{coure.tieuDe}</NavLink>
                    ))}

                </ul>
            </div>
        </>
    );
}

export default CouresDetail;