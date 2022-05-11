import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons'

import styles from './Practice.module.css';
import ImageDev from '../../images/userImageDev.png';

function Practice(props) {

    const [toggle, setToggle] = useState("Tự học");
    const [level, setLevel] = useState("Độ khó");
    const navigate = useNavigate();

    const handleToggle = () => {
        if (toggle === "Tự học") {
            setToggle("Luyện tập");
            return;
        } else {
            setToggle("Tự học");
        }
    }
    const handClickPractice = () => {
        navigate('/practice/code');
    }

    useEffect(() => {

    }, [])
    // console.log("Level", level); 
    return (
        <>
            <div className={styles.practice}>
                <div className={styles.conten_control}>
                    <div className={styles.conten_control_search}>
                        <input type="text" className={styles.control_search} placeholder="Tìm kiếm bài tập" />
                        <FontAwesomeIcon className={styles.iconPracticeHeader} icon={faMagnifyingGlass} />
                    </div>

                    <select name="level" value={level} id={styles.option_trangthai} onChange={(e)=> setLevel(e.target.value)} >
                        <option value="Dễ" >Dễ</option>
                        <option value="Trung bình" >Trung bình</option>
                        <option value="Khó">Khó</option>
                    </select>
                    <div className={styles.toggle}>
                        <input type="checkbox" onClick={handleToggle} />
                        <label className={styles.onbtn}>{toggle}</label>
                    </div>
                    {/* <img class="baner" src="img\banner.png"/> */}
                </div>

                <div className={styles.conten_list_exercise}>
                    <ul className={styles.list_exercise}>
                        <li>
                            <div className={styles.item_list} onClick={handClickPractice}>
                                <h3 className={styles.title}>SNT</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>nvduy_0511</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>50/120</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span id={styles.average} >Trung Bình</span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={styles.item_list}>
                                <h3 className={styles.title}>SNT</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>nvduy_0511</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>50/120</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span id={styles.easy} >Dễ</span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={styles.item_list}>
                                <h3 className={styles.title}>SNT</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>nvduy_0511</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>50/120</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span id={styles.hard} >Khó</span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={styles.item_list}>
                                <h3 className={styles.title}>SNT</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>nvduy_0511</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>50/120</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span id={styles.easy} >Dễ</span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className={styles.item_list}>
                                <h3 className={styles.title}>SNT</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>nvduy_0511</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>50/120</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span id={styles.easy} >Dễ</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>

        </>
    );
}

export default Practice;