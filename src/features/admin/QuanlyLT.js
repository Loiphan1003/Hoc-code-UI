import React, { useEffect, useState } from 'react'
import MonHocAPI from '../../apis/monHocAPI'
import styles from "./QuanlyLT.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faPen, faAdd, faEye } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../../components/Backdrop';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import LyThuyetAPI from '../../apis/lyThuyetAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const cx = classNames.bind(styles);

function QuanlyLT() {
    const navigate = useNavigate();
    const [resetMH, setResetMH] = useState(false);
    const [openAddMH, setOpenAddMH] = useState(false);
    const [openEditMH, setOpenEditMH] = useState(false);
    const [openDeleteMH, setOpenDeleteMH] = useState(false);
    const [openEditLT, setOpenEditLT] = useState(false);
    const [openDeleteLT, setOpenDeleteLT] = useState(false);
    const [monHoc, setMonHoc] = useState([]);
    const [lyThuyet, setLyThuyet] = useState([]);
    const [monHoc_Custom, setMonHoc_Custom] = useState({
        id: 0,
        ten: "",
        moTa: "",
        hinh: "",
    });
    const [lyThuyet_Custom, setLyThuyet_Custom] = useState({
        id: 0,
        tieuDe: "",
        noiDung: "",
        idMonHoc: 0,
    })

    useEffect(() => {
        const data = async () => {
            try {
                const response = await MonHocAPI.getAll();
                setMonHoc(response.data);
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }, [resetMH])

    const handleAdd = () => {
        const data = async () => {
            try {
                const response = await MonHocAPI.AddMonHoc(monHoc_Custom);
                if (response.data) {
                    alert("Thêm mới thành công");
                    setOpenAddMH(false);
                    setMonHoc_Custom({ id: 0, ten: "", moTa: "", hinh: "" });
                    setResetMH(!resetMH);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }
    // const img = document.getElementById("upload").files[0].name;
    // console.log(img);
    // setHinh(img);
    // console.log(hinh)
    const handleEditMonHoc = (Id, tenMonHoc, moTa, hinhAnh) => {
        setMonHoc_Custom({
            id: Id,
            ten: tenMonHoc,
            moTa: moTa,
            hinh: "",
        })
        setOpenEditMH(true);
    }

    const handleEdit = () => {
        const data = async () => {
            try {
                const response = await MonHocAPI.EditMonHoc(monHoc_Custom);
                if (response.data) {
                    setMonHoc_Custom({ id: 0, ten: "", moTa: "", hinh: "" });
                    alert("Sửa thông tin môn học thành công");
                    setOpenEditMH(false);
                    setResetMH(!resetMH);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const handOpenleDelete = (Id, tenMonHoc) => {
        setMonHoc_Custom({
            ...monHoc_Custom,
            id: Id,
            ten: tenMonHoc,
        })
        setOpenDeleteMH(true);
    }

    const handleDeleteMH = () => {
        const data = async () => {
            try {
                const response = await MonHocAPI.DeleteMonHoc(monHoc_Custom.id);
                if (response.data) {
                    setMonHoc_Custom({ id: 0, ten: "", moTa: "", hinh: "" });
                    setResetMH(!resetMH);
                    setOpenDeleteMH(false);
                }
                else {
                    alert("Môn học đang tồn tại bài học không thể xóa");
                    setOpenDeleteMH(false);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const handGetAllById = (id) => {
        const data = async () => {
            try {
                const response = await LyThuyetAPI.getAll(id);
                if (response.data) {
                    setLyThuyet(response.data.lyThuyets);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const handleOpenEditLT = (Id, TieuDe, NoiDung) => {
        setLyThuyet_Custom({
            ...lyThuyet_Custom,
            id: Id,
            tieuDe: TieuDe,
            noiDung: NoiDung,
        })
        setOpenEditLT(true);
    }

    const handleEditLT = () => {
        const data = async () => {
            try {
                const response = await LyThuyetAPI.EditLT(lyThuyet_Custom);
                if (response.data) {
                    setLyThuyet_Custom({ id: 0, tieuDe: "", noiDung: "", idMonHoc: 0 });
                    alert("Sửa thông tin thành công");
                    setOpenEditLT(false);
                    setLyThuyet([]);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const handleOpenDeleteLT = (Id, TieuDe) => {
        setLyThuyet_Custom({
            ...lyThuyet_Custom,
            id: Id,
            tieuDe: TieuDe,
        })
        setOpenDeleteLT(true);
    }

    const handleDeleteLT = () => {
        const data = async () => {
            try {
                const response = await LyThuyetAPI.DeleteLT(lyThuyet_Custom.id);
                if (response.data) {
                    alert("Xóa bài học thành công");
                    setLyThuyet_Custom({ id: 0, tieuDe: "", noiDung: "", idMonHoc: 0 });
                    setOpenDeleteLT(false);
                    setLyThuyet([]);
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    return (
        <div>
            <div>
                <table className={styles.custom_table}>
                    <thead>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th>
                                ID bài
                            </th>
                            <th>
                                Tiêu đề bài
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    {lyThuyet.map((item, index) => {
                        return (
                            <tbody key={item.id} >
                                <tr>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.tieuDe}
                                    </td>
                                    <td>
                                        <button onClick={() => handleOpenEditLT(item.id, item.tieuDe, item.noiDung)}>
                                            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> Sửa
                                        </button>
                                        <span> | </span>
                                        <button onClick={() => handleOpenDeleteLT(item.id, item.tieuDe)}>
                                            <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon> Xóa
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
            <table className={styles.custom_table}>
                <thead>
                    <tr>
                        <th>
                            STT
                        </th>
                        <th>
                            ID môn học
                        </th>
                        <th>
                            Tên môn học
                        </th>
                        <th>
                            Mô tả
                        </th>
                        <th></th>
                    </tr>
                </thead>
                {monHoc.map((item, index) => {
                    return (
                        <tbody key={item.id} >
                            <tr>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.tenMonHoc}
                                </td>
                                <td>
                                    {item.moTa}
                                </td>
                                <td>
                                    <button onClick={() => handleEditMonHoc(item.id, item.tenMonHoc, item.moTa, item.hinhAnh)}>
                                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon> Sửa
                                    </button>
                                    <span> | </span>
                                    <button onClick={() => handOpenleDelete(item.id, item.tenMonHoc)}>
                                        <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon> Xóa
                                    </button>
                                    <span> | </span>
                                    <button onClick={() => handGetAllById(item.id)}>
                                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> Xem bài
                                    </button>
                                    <span> | </span>
                                    <button onClick={() => navigate(`/QuanLyLT/createLyThuyet/${item.id}/${item.tenMonHoc}`)}>
                                        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Thêm bài
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            <div>
                <button className={styles.btnAdd} onClick={() => setOpenAddMH(true)}>
                    <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Thêm mới môn học
                </button>
                {/* màn hình thêm môn học */}
                {openAddMH && <Backdrop onClick={() => setOpenAddMH(false)} />}
                {openAddMH && <div className={cx('content')}>
                    <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>THÊM MỚI MÔN HỌC</p>
                    <TextField sx={{ marginTop: "20px" }} fullWidth label="Tên môn học" id="fullWidth" value={monHoc_Custom.ten} multiline onChange={e => setMonHoc_Custom({ ...monHoc_Custom, ten: e.target.value })} />
                    <TextField sx={{ marginTop: "30px" }} fullWidth label="Mô tả" id="fullWidth" value={monHoc_Custom.moTa} multiline onChange={e => setMonHoc_Custom({ ...monHoc_Custom, moTa: e.target.value })} />
                    <div className={cx('input-file')}>
                        <p>Hình ảnh cho môn học</p>
                        <input className={styles.upfile} id="upload" type="file" name='img' accept="image/*"
                            value={monHoc_Custom.hinh}
                            onChange={(event) => { setMonHoc_Custom({ ...monHoc_Custom, hinh: event.target.value }) }}
                            onClick={(event) => { setMonHoc_Custom({ ...monHoc_Custom, hinh: event.target.value = null }) }}
                        />
                    </div>

                    <Button variant="contained" style={{ backgroundColor: "darkgray" }}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenAddMH(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<SaveIcon />}
                        onClick={handleAdd}
                    >
                        Lưu
                    </Button>
                </div>}
                {/* màn hình sửa môn học */}
                {openEditMH && <Backdrop onClick={() => setOpenEditMH(false)} />}
                {openEditMH && <div className={cx('content')}>
                    <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>SỬA THÔNG TIN MÔN HỌC ({monHoc_Custom.id})</p>
                    <TextField sx={{ marginTop: "20px" }} fullWidth label="Tên môn học" id="fullWidth" value={monHoc_Custom.ten} multiline onChange={e => setMonHoc_Custom({ ...monHoc_Custom, ten: e.target.value })} />
                    <TextField sx={{ marginTop: "30px" }} fullWidth label="Mô tả" id="fullWidth" value={monHoc_Custom.moTa} multiline onChange={e => setMonHoc_Custom({ ...monHoc_Custom, moTa: e.target.value })} />
                    <div className={cx('input-file')}>
                        <p>Hình ảnh cho môn học</p>
                        <input className={styles.upfile} id="upload" type="file" name='img' accept="image/*"
                        // value={monHoc_Custom.hinh}
                        // onChange={(event) => {setMonHoc_Custom({...monHoc_Custom, hinh: event.target.value})}} 
                        // onClick={(event)=> {setMonHoc_Custom({...monHoc_Custom, hinh: event.target.value = null})}}
                        />
                    </div>

                    <Button variant="contained" style={{ backgroundColor: "darkgray" }}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenEditMH(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<SaveIcon />}
                        onClick={handleEdit}
                    >
                        Lưu
                    </Button>
                </div>}
                {/* màn hình xác nhận xóa môn học*/}
                {openDeleteMH && <Backdrop onClick={() => setOpenDeleteMH(false)} />}
                {openDeleteMH && <div className={cx('content')}>
                    <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Bạn có muốn xóa môn học
                        <span style={{ color: "red" }}> {monHoc_Custom.ten} ID: {monHoc_Custom.id}</span>
                    </p>
                    <Button variant="contained" style={{ backgroundColor: "darkgray" }}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenDeleteMH(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<DeleteIcon />}
                        onClick={handleDeleteMH}
                    >
                        Xóa
                    </Button>
                </div>}
                {/* màn hình sửa thông tin bài học */}
                {openEditLT && <Backdrop onClick={() => setOpenEditLT(false)} />}
                {openEditLT && <div className={cx('contentLT')}>
                    <p style={{ fontSize: "20px", fontWeight: "bold", margin: "auto" }}>Sửa thông tin bài học {lyThuyet_Custom.tieuDe}</p>
                    <TextField sx={{ marginTop: "50px" }} fullWidth label="Tiêu đề" id="fullWidth" value={lyThuyet_Custom.tieuDe} onChange={e => setLyThuyet_Custom({ ...lyThuyet_Custom, tieuDe: e.target.value })} />
                    <div className={cx('noiDung')}>
                        <p>Nội dung</p>
                        <CKEditor
                            editor={ClassicEditor}
                            height="200px"
                            data={lyThuyet_Custom.noiDung}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            value={lyThuyet_Custom.noiDung}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setLyThuyet_Custom({ ...lyThuyet_Custom, noiDung: data });
                            }}
                            
                        />
                    </div>
                    <Button variant="contained" style={{ backgroundColor: "darkgray" }}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenEditLT(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<SaveIcon />}
                        onClick={handleEditLT}
                    >
                        Lưu
                    </Button>
                </div>}
                {/* màn hình xác nhận xóa bài học*/}
                {openDeleteLT && <Backdrop onClick={() => setOpenDeleteLT(false)} />}
                {openDeleteLT && <div className={cx('content')}>
                    <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Bạn có muốn xóa bài học
                        <span style={{ color: "red" }}> {lyThuyet_Custom.tieuDe} ID: {lyThuyet_Custom.id}</span>
                    </p>
                    <Button variant="contained" style={{ backgroundColor: "darkgray" }}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenDeleteLT(false)}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" style={{ marginLeft: "20px" }}
                        endIcon={<DeleteIcon />}
                        onClick={handleDeleteLT}
                    >
                        Xóa
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default QuanlyLT