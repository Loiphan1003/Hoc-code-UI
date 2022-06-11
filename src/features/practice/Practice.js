import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styles from './Practice.module.css';
import clsx from 'clsx';
import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Practice(props) {

    const [level, setLevel] = useState(0);
    const [baiTapCode,setBaiTapCode] = useState([])
    const navigate = useNavigate();

    const handClickPractice = (id) => {
        navigate(`/practice/code/${id}`);
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const getAllBaiTapCode = async () =>{
                    try {
                        const response = await BaiTapLuyenTapAPI.getAll();
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
                    <div>
                        <FormControl >
                            <Select
                                value={level}
                                onChange={e => setLevel(e.target.value)}
                                sx={{backgroundColor:'white', height:'31px', marginLeft:"10px"}}
                            >
                                <MenuItem value={0}>Tất cả</MenuItem>
                                <MenuItem value={1}>Dễ</MenuItem>
                                <MenuItem value={2}>Khó</MenuItem>
                                <MenuItem value={3}>Trung Bình</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className={styles.conten_list_exercise}>
                    <ul className={styles.list_exercise}>
                    {
                        baiTapCode.map( baitap => (
                        <li key={baitap.id}>
                            <div className={styles.item_list} onClick={() => handClickPractice(baitap.id)}>
                                <h3 className={styles.title}>{baitap.tieuDe}</h3>
                                <div className={styles.tag}>
                                    <span>{baitap.tag}</span>
                                </div>
                                <div className={styles.image_avatar} >
                                   
                                    <Avatar className={styles.avatar}
                                        alt='avatar'
                                        sx={{
                                            height: "70px",
                                            width: "70px",
                                            fontSize: "25px"
                                        }}
                                        src={window.atob(baitap.linkAvatar)}
                                    >
                                        U
                                    </Avatar>
                                </div>
                                <div className={styles.username}>{baitap.tenHienThi !== null ? baitap.tenHienThi : "Admin"}</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>{baitap.soNguoiLam+'/'+baitap.soNguoiThanhCong}</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span className={clsx({
                                            [styles.easy]: baitap.doKho === 1,
                                            [styles.average]: baitap.doKho === 2,
                                            [styles.hard]: baitap.doKho === 3,
                                        })}>{baitap.doKho === 1 ? 'Dễ':(baitap.doKho === 2 ? 'Trung bình':'Khó' )}</span>
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