import React from 'react';
import styles from './Practice.module.css';

function NavBarLevel(props) {

    const exerciseLevel = ["Dễ","Trung bình", "khó"]


    const handleLevel = (level)=>{
        props.value(level);
    }

    return (
        <div className={styles.navLevel}>
            {exerciseLevel.map(level =>(
                <p className={styles.level} key={level} onClick={()=>handleLevel(level)}>{level}</p>
            ))}
        </div>
    );
}

export default NavBarLevel;