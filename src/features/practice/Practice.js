import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons'

import styles from './styles/Practice.module.css';
import ImageDev from '../../images/userImageDev.png';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI';

function Practice(props) {

    const [toggle, setToggle] = useState("Tự học");
    const [level, setLevel] = useState("Độ khó");
    const [baiTapCode, setBaiTapCode] = useState([]);
    const navigate = useNavigate();

    const getAllBaiTapCode = async () => {
        try {
            const response = await BaiTapCodeAPI.getAll();
            setBaiTapCode(response.data);
        } catch (error) {
            console.log("Fetch data false");
        }
    }

    useEffect(() => {
        getAllBaiTapCode();
    }, [])

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

    const handleFindText = (text) => {
        if(text.length > 0){
            let searchText = baiTapCode.filter(baitap => baitap.tieuDe.includes(text));
            setBaiTapCode(searchText);
        }
        if(text.length === 0){
            getAllBaiTapCode();
            return;
        }
    }

    return (
        <>
            <div className={styles.practice}>
                <div className={styles.conten_control}>
                    <div className={styles.conten_control_search}>
                        <input type="text" className={styles.control_search} placeholder="Tìm kiếm bài tập" onChange={(e) => handleFindText(e.target.value)} />
                        <FontAwesomeIcon className={styles.iconPracticeHeader} icon={faMagnifyingGlass} />
                    </div>

                    <select name="level" value={level} defaultValue="" id={styles.option_trangthai} onChange={(e) => setLevel(e.target.value)} >
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
                        {baiTapCode.map(baitap => (
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
                                            <span id={baitap.doKho === "0" ? styles.easy : (baitap.doKho === 1 ? styles.average : styles.hard)} >{baitap.doKho === 1 ? "Dễ" : (baiTapCode.doKho === 2 ? "Trung bình":"Khó")}</span>
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