import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ImageDev from '../../images/userImageDev.png'
import { NavLink } from 'react-router-dom';
import styles from './Exercise.module.css';
// import { Fragment } from 'react';

function Exercise(props) {

    const [openNav, setOpenNav] = useState(false);

        
    const test =   [
        { title: "Lập trình c", tag: "code", ownerName: "nvduy_0511", level: "Dễ" },
        { title: "Lập trình c++", tag: "code", ownerName: "nvduy_0511", level: "Trung bình" }
    ]

    const [dataTest, setDataTest] = useState(test);


    const handleFindText = (value) => {
        let searchText = test.filter(data => data.title.includes(value)) 
        // )
        setDataTest(searchText);
        // console.log(searchText);
    }

    console.log(dataTest);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.toolbar} >

                    <div className={styles.find} >
                        <input type='text' placeholder='Tim kiem' onChange={(e) => handleFindText(e.target.value)} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>

                    {/* <div> */}
                    <select className={styles.level} defaultValue="Cấp độ" >
                        <option>Dễ</option>
                        <option>Trung bình</option>
                        <option>Khó</option>
                    </select>
                    {/* </div> */}

                    <div className={styles.create_exercise} >
                        <div className={styles.create} onClick={() => setOpenNav(true)} >
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Tạo bài tập</p>
                        </div>

                        {openNav && <div className={styles.backdrop} onClick={() => setOpenNav(false)} ></div>}
                        {openNav && <div className={styles.navCreateExercise} >
                            <NavLink to='/exercise/create' >Bài tập code</NavLink>
                            <NavLink to='/exercise/multiplechoice' >Bài tập trắc nghiệm</NavLink>
                        </div>}

                    </div>



                </div>
                <div className={styles.content} >
                    {dataTest.map((data, index) => (

                        <div key={index} >
                            <p>{data.title}</p></div>
                        // <div key={index} className={styles.item_list}>
                        //     <h3 className={styles.title}>{data.title}</h3>
                        //     <div className={styles.tag}>
                        //         <span>{data.tag}</span>
                        //     </div>
                        //     <div className={styles.image_avatar} >

                        //         <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                        //     </div>
                        //     <div className={styles.username}>nvduy_0511</div>
                        //     <div className={styles.item_footer}>
                        //         <div className={styles.userpass}>
                        //             {/* <i class="fa-solid fa-users"></i> */}
                        //             <FontAwesomeIcon icon={faUserGroup} />
                        //             <span>50/120</span>
                        //         </div>
                        //         <div className={styles.level}>
                        //             <span id={styles.average} >Trung Bình</span>
                        //         </div>
                        //     </div>
                        // </div>
                    ))
                    }
                </div>
            </div>
        </>

    );
}

export default Exercise;