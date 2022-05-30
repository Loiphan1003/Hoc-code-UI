import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons'

import styles from './styles/Practice.module.css';
import ImageDev from '../../images/userImageDev.png';
import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI';

function Practice(props) {

    const [inputFind, setInputFind] = useState("");
    const [toggle, setToggle] = useState("Tự học");
    // const [level, setLevel] = useState("");
    const [baiTapCode, setBaiTapCode] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const getAllBaiTapCode = async () => {
            try {
                const response = await BaiTapLuyenTapAPI.getAll();
                setBaiTapCode(response.data);
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }

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

    const handleFind = () => {
        if (inputFind.length > 0) {
            let searchText = baiTapCode.filter(baitap => baitap.tieuDe.includes(inputFind));
            setBaiTapCode(searchText);
        }
        if (inputFind.length === 0) {
            // getAllBaiTapCode();
            return;
        }
    }

    return (
        <>
            <div className={styles.practice}>
                <div className={styles.conten_control}>
                    <div className={styles.conten_control_search}>
                        <input type="text" className={styles.control_search} onChange={(e) => setInputFind(e.target.value)} placeholder="Tìm kiếm bài tập..." />
                        <FontAwesomeIcon className={styles.iconPracticeHeader} onClick={() => handleFind()} icon={faMagnifyingGlass} />
                    </div>

                    <select name="level" id={styles.option_trangthai} >
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
                                    <div className={styles.username}>{baitap.tenHienThi}</div>
                                    <div className={styles.item_footer}>
                                        <div className={styles.userpass}>
                                            {/* <i class="fa-solid fa-users"></i> */}
                                            <FontAwesomeIcon icon={faUserGroup} />
                                            <span>{baitap.soNguoiThanhCong}/{baitap.soNguoiLam}</span>
                                        </div>
                                        <div className={styles.level}>
                                            <span id={baitap.doKho === "0" ? styles.easy : (baitap.doKho === 1 ? styles.average : styles.hard)} >{baitap.doKho === 1 ? "Dễ" : (baiTapCode.doKho === 2 ? "Trung bình" : "Khó")}</span>
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