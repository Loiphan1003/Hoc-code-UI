import React from 'react'
import { useEffect, useState } from 'react'
import NguoiDungAPI from '../../apis/nguoiDungAPI';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styles from './QuanLyUser.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faPen, faAdd } from '@fortawesome/free-solid-svg-icons';

function QuanLyUser() {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [date, setDate] = useState("")
    const [school, setSchool] = useState("")
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [deleteAction, setDeleteAction] = useState("");
    // dùng để gắn trạng thái reset lại bảng user
    const [reset, setReset] = useState(true);
    // lấy id của user
    // const [idUser, setIdUser] = useState("")

    const [user, setUser] = useState([]);
    useEffect(() => {
        const data1 = async () => {
            try {
                const response = await NguoiDungAPI.getAll();
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
        setId("");
        setName("");
        setMail("");
        setDate("");
        setSchool("");
        setCloseAdd(false)
    }

    const [closeEdit, setCloseEdit] = useState(true);
    function handleCloseEdit() {
        setName("");
        setMail("");
        setDate("");
        setSchool("");
        setCloseEdit(true)
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

        if (handleCheck() === false) {
            setOpenDialogAdd(true);
            
            return;
        }
        else {
            const data = async () => {
                try {
                    await NguoiDungAPI.AddNguoiDung(id, name, mail, date, school);
                    setId("");
                    setName("");
                    setMail("");
                    setDate("");
                    setSchool("");
                    setReset(!reset);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            data();
        }
    }

    const handleClose = () => {
        setOpenDialogAdd(false);
        setOpenDialog(false);
    }

    const handleDelete = (id) => {
        const data = async () => {
            try {
                await NguoiDungAPI.RemoveNguoiDung(id);
                setReset(!reset);
                console.log("Thanh cong");
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    }

    function handleUpdateuser() {
        const data = async () => {
            try {
                // const response = 
                await NguoiDungAPI.EditNguoiDung(id, name, mail, date, school);
                setId("");
                setName("");
                setMail("");
                setDate("");
                setSchool("");
                setReset(!reset);
                console.log("cap nhat thanh cong");
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    }

    const handleCheck = () => {
        if (name === "" || mail === "" || date === "" || school === "") {
            return false;
        }
        if(mail.includes("@gmail.com") === false){
            return false;
        }
        else {
            return true;
        }
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
                            Học tại
                        </th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                {user.map((item, index) => {
                    return (
                        <tbody className={styles.item_list} key={item.uId} >
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
                                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => setOpenDialog(true)}>
                                        <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
                                    </button>
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
                            <span>Thêm Người Dùng</span>
                        </div>
                        <div className={styles.modal_body}>
                            <div className={styles.from}>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={id} onChange={e => setId(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Mã</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={name} onChange={e => setName(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Tên</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input type='email' className={styles.custom_input} value={mail} onChange={e => setMail(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Email</label>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} type='date' value={date} onChange={e => setDate(e.target.value)}></input>
                                </div>
                                <div className={styles.from_body}>
                                    <input className={styles.custom_input} value={school} onChange={e => setSchool(e.target.value)}></input>
                                    <label className={styles.custom_lable}>Trường học</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={handleCloseAdd}>Đóng</button>
                            <button onClick={handleAdduser}>Lưu</button>
                        </div>
                    </div>
                </div>
                {/* man hinh edit user */}

                {closeEdit === false &&
                    <div className={styles.modal} hidden={closeEdit}>
                        <div className={styles.modal_inner}>
                            <div className={styles.modal_header}>
                                <span>Sửa Người Dùng ({id})</span>
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
                    </div>}
            </div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có thật sự muốn xóa?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sau khi xóa
                        {deleteAction.isBTCode ? " bài tập code " : " bài tập trắc nghiệm "} có
                        <span style={{ fontWeight: "bold", color: "#f04530" }}> ID: {deleteAction.id} </span>
                        bạn sẽ không thể khôi phục lại. Bạn có đồng ý với điều này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDialogAdd}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Vui lòng nhập đầy đủ thông tin?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hãy xem lại thông tin bạn nhập đã chĩnh xác, kiểm tra đã nhập đầy đủ thông tin.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default QuanLyUser