import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './couresDetail.module.css';
// import Course from '../../components/theory/Course';

function CouresDetail(props) {

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

    const handleClick = (name)=>{
        navigate('/couredetail/section');
    }

    return (
        <>
            <Header data={props.data} />
            <div className={styles.couresDetail}>
                <div className={styles.couresDetailTitle}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABCUlEQVRoge2ZvQ7BUBhADxJeQFls4nkM1MuIUTwLFoN4FYsJg5+RWBkaC9r7SfD1k+8kd23PzT1Nb2/BcRznnygBA2ADXIAF0FI1epMRcH0YWyDSlJJSBs48T+AKTBS9xES8lr+PWE9Nzor0CRwwkFJM9iqYSGmC8ZSqwI70CRyBupqdkDbZqzDTU5PjKeUBTykPeEp5IZRSR09NRkSyH0qbwBIoqNkJCaXUePeCxU/aCaj8+H4fxXxCph/iHtnyYz21MFVgT/aLrKZmJyCUTldPLYyno8kUw7tQT0cT0+mYP9gyfbRo/nC3DJwwms6dIc/yZn5wQPKB1AfWJL+Y5kBT1chxHOer3ACRUQNvmM3mPwAAAABJRU5ErkJggg==" alt='icon' />
                    <h1>Chương trình C cho người bắt đầu</h1>
                    <ul className={styles.couresDetailList}>
                        {coures.map(coure => (
                            <li key={coure.id} className={styles.coure} onClick={()=> handleClick(coure.name)}>{coure.name}</li>
                        ))}

                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CouresDetail;