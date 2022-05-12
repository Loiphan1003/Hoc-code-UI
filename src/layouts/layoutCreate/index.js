import React from 'react';
import Header from '../../components/header/Header';
import styles from './LayoutCreate.module.css';


function LayoutCreate({children}) {
    return (
        <>
            <Header/>
            <div className={styles.container} >
                {children}
            </div>
        </>
    );
}

export default LayoutCreate;