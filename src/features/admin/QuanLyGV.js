import React from 'react'
import styles from './QuanLyGV.module.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faAdd } from '@fortawesome/free-solid-svg-icons';
import GiangVienAPI from '../../apis/giangVienAPI';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';

function QuanLyGV() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [date, setDate] = useState("")
    const [school, setSchool] = useState("")
    const [passworkEmail, setPassworkEmail] = useState("");
    // dùng để gắn trạng thái reset lại bảng user
    const [reset, setReset] = useState(true);
    // lấy id của user
    // const [idUser, setIdUser] = useState("")

    const [user, setUser] = useState([]);
    useEffect(() => {
        const data1 = async () => {
            try {
                const response = await GiangVienAPI.getAll();
                setUser(response.data);
            } catch (error) {
                
                console.log("Fetch data error: ", error);
            }
        }
        data1();
    }, [reset])

    const [closeAdd, setCloseAdd] = useState(true)
    function handleCloseAdd() {
        setCloseAdd(true);
    }
    function handleUpAdd() {
        setCloseAdd(false)
    }

    const [closeEdit, setCloseEdit] = useState(true);
    function handleCloseEdit() {
        setCloseEdit(true);
        // setId("");
        setName("");
        setMail("");
        setDate("");
        setSchool("");
    }
    const handleEditUser = (id, hoTen, email, namSinh, truong) => {
        setCloseEdit(false);
        setId(id);
        setName(hoTen);
        setMail(email);
        setDate(namSinh);
        setSchool(truong);
    }

    function handleAdduser() {
        const data = async () => {
            let id = '';
            try {
                const response1 = await createUserWithEmailAndPassword(auth, mail, passworkEmail);
                id = response1.user.uid;
                const response = await GiangVienAPI.AddGV(id, name, mail, date, school);
                if (response.data) {
                    alert("Thêm tài khoản thành công");
                    setName("");
                    setMail("");
                    setDate("");
                    setSchool("");
                    setPassworkEmail("");
                    setReset(!reset);
                }
            } catch (error) {
                if(String(error) === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                    alert("Tài khoản email đã được sử dụng");
                }
                // console.log("Fetch data error: ", typeof String(error));
            }
        }
        data();
    }

    function handleUpdateuser() {
        const data = async () => {
            try {
                // const response = 
                await GiangVienAPI.EditGV(id, name, date, school);
                alert("cap nhat thanh cong");
                setName("");
                setDate("");
                setSchool("");
                setReset(!reset);
                setCloseEdit(true);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    }


    return (
        <div>
            <table className={styles.custom_table}>
                <thead>
                    <tr>
                        <th>
                            STT
                        </th>
                        <th>
                            Mã người dùng
                        </th>
                        <th>
                            Họ và tên
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Ngày sinh
                        </th>
                        <th>
                            Làm việc tại trường
                        </th>
                        <th></th>
                    </tr>
                </thead>
                {user.map((item, index) => {
                    return (
                        <tbody key={item.uId} >
                            <tr>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {item.uId}
                                </td>
                                <td>
                                    {item.hoTen}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.namSinh}
                                </td>
                                <td>
                                    {item.truong}
                                </td>
                                <td>
                                    <button onClick={() => handleEditUser(item.uId, item.hoTen, item.email, item.namSinh, item.truong)}>
                                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> Sửa
                                    </button>
                                    {/* <span> | </span> */}
                                    {/* <button onClick={() => handelDelete(item.uId)}>
                                    <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon> Xóa
                                </button> */}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            <div>
                <button className={styles.btnAdd} onClick={handleUpAdd}>
                    <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Thêm mới
                </button>
                {/* màn hình thêm người dùng */}
                <div className={styles.modal} hidden={closeAdd}>
                    <div className={styles.modal_inner}>
                        <div className={styles.modal_header}>
                            <span>Thêm Giảng Viên</span>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.from}>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={name} onChange={e => setName(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Tên</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input type={'email'} className={styles.custom_input} value={mail} onChange={e => setMail(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Email</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={passworkEmail} onChange={e => setPassworkEmail(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Mật khẩu</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} type='date' value={date} onChange={e => setDate(e.target.value)}></input>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={school} onChange={e => setSchool(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Trường</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={handleCloseAdd}>Đóng</button>
                            <button onClick={handleAdduser}>Thêm</button>
                        </div>
                    </div>
                </div>
                {/* man hinh edit user */}
                <div className={styles.modal} hidden={closeEdit}>
                    <div className={styles.modal_inner}>
                        <div className={styles.modal_header}>
                            <span>Sửa Giảng Viên ({id})</span>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.from}>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={name} onChange={e => setName(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Tên</label>
                                </div>
                                {/* <div className={styles.from_body}>
                                <input type={'email'} className={styles.custom_input} value={mail} onChange={e => setMail(e.target.value)}></input>
                                <label className={styles.custom_lable}>Email</label>
                            </div> */}
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} type='datetime-local' value={date} onChange={e => setDate(e.target.value)}></input>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={school} onChange={e => setSchool(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Trường học</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={handleCloseEdit}>Đóng</button>
                            <button onClick={handleUpdateuser}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuanLyGV