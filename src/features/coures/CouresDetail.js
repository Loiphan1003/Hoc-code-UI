import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from './styles/couresDetail.module.css';
import LyThuyetAPI from '../../apis/lyThuyetAPI';

function CouresDetail(props) {

    const [coures, setCoures] = useState([]);
    let params = useParams()

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const getTheoryLection = async () =>{
                    try {
                        const response = await LyThuyetAPI.getAll(params.courseID);
                        setCoures(response.data);
                    } catch (error) {
                        console.log("Fetch data false ", error);
                    }
                }
                getTheoryLection();
            }
        });
    }, [params.courseID])


    return (
        <>
            <div className={styles.couresDetail}>
                <div className={styles.couresDetailTitle}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABCUlEQVRoge2ZvQ7BUBhADxJeQFls4nkM1MuIUTwLFoN4FYsJg5+RWBkaC9r7SfD1k+8kd23PzT1Nb2/BcRznnygBA2ADXIAF0FI1epMRcH0YWyDSlJJSBs48T+AKTBS9xES8lr+PWE9Nzor0CRwwkFJM9iqYSGmC8ZSqwI70CRyBupqdkDbZqzDTU5PjKeUBTykPeEp5IZRSR09NRkSyH0qbwBIoqNkJCaXUePeCxU/aCaj8+H4fxXxCph/iHtnyYz21MFVgT/aLrKZmJyCUTldPLYyno8kUw7tQT0cT0+mYP9gyfbRo/nC3DJwwms6dIc/yZn5wQPKB1AfWJL+Y5kBT1chxHOer3ACRUQNvmM3mPwAAAABJRU5ErkJggg==" alt='icon' />
                    <h1>Chương trình C cho người bắt đầu</h1>
                    <ul className={styles.couresDetailList}>
                        {coures.map(coure => (
                            <NavLink  to={`/couredetail/section/${coure.id}`} key={coure.id} className={styles.coure} >{coure.tieuDe}</NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CouresDetail;