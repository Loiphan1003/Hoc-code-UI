import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSortDown, faUserGroup } from '@fortawesome/free-solid-svg-icons'

import NavBarLevel from './NavBarLevel';
import styles from './Practice.module.css';
import ImageDev from '../../images/userImageDev.png';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Practice(props) {

    const [toggle, setToggle] = useState("Tự học");
    const [level, setLevel] = useState("Độ khó");
    const [navBarLevelOpen, setNavBarLevelOpen] = useState(false);
    const [baiTapCode,setBaiTapCode] = useState([])
    const navigate = useNavigate();

    const handleToggle = () => {
        if (toggle === "Tự học") {
            setToggle("Luyện tập");
            return;
        } else {
            setToggle("Tự học");
        }
    }
    const handClickPractice = (id) => {
        navigate(`/practice/code/${id}`);
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const getAllBaiTapCode = async () =>{
                    try {
                        const response = await BaiTapCodeAPI.getAll();
                        setBaiTapCode(response.data);
                    } catch (error) {
                        console.log("Fetch data false ", error);
                    }
                }
                getAllBaiTapCode();
            }
        });
    }, [])

    return (
        <>
            <div className={styles.practice}>
                <div className={styles.conten_control}>
                    <div className={styles.conten_control_search}>
                        <input type="text" className={styles.control_search} placeholder="Tìm kiếm bài tập" />
                        <FontAwesomeIcon className={styles.iconPracticeHeader} icon={faMagnifyingGlass} />
                    </div>

                    <div name="level" id={styles.option_trangthai} onClick={() => setNavBarLevelOpen(!navBarLevelOpen)}>
                        <span>{level}</span>
                        <FontAwesomeIcon className={styles.icon_small} icon={faSortDown} />
                        {navBarLevelOpen && <NavBarLevel value={setLevel} />}
                    </div>
                    <div className={styles.toggle}>
                        <input type="checkbox" onClick={handleToggle} />
                        <label className={styles.onbtn}>{toggle}</label>
                    </div>
                    {/* <img class="baner" src="img\banner.png"/> */}
                </div>

                <div className={styles.conten_list_exercise}>
                    <ul className={styles.list_exercise}>
                    {
                        baiTapCode.map( baitap => (
                        <li key={baitap.id}>
                            <div className={styles.item_list} onClick={() => handClickPractice(baitap.id)}>
                                <h3 className={styles.title}>{baitap.tieuDe}</h3>
                                <div className={styles.tag}>
                                    <span>Code</span>
                                </div>
                                <div className={styles.image_avatar} >
                                    <img className={styles.avatar} src={ImageDev} alt='OwnerImage' />
                                </div>
                                <div className={styles.username}>{baitap.uIdNguoiTao}</div>
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
                        </li>))
                    }
                    </ul>

                </div>
            </div>

        </>
    );
}

export default Practice;