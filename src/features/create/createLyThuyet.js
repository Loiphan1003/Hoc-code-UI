import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './createLyThuyet.module.css'
import LyThuyetAPI from '../../apis/lyThuyetAPI';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const cx = classNames.bind(styles);



function CreateLyThuyet() {

    const navigate = useNavigate();
    let { IdMonHoc, TenMonHoc } = useParams();
    const [lyThuyet, setLyThuyet] = useState({
        id: 0,
        TieuDe: "",
        NoiDung: "",
        ID_MonHoc: IdMonHoc,
    })

    const handleAddLT = () => {
        console.log(lyThuyet)
        const data = async () => {
            try {
                const response = await LyThuyetAPI.AddLT(lyThuyet)
                if (response.data) {
                    alert("Thêm bài thành công");
                    navigate('/Admin/Quanlybailythuyet');
                }
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    return (
        <>
            <p style={{ fontSize: "20px", fontWeight: "bold", margin: "30px 50px 0px" }}>Thêm bài mới cho môn học {TenMonHoc}</p>
            <div className={cx('content')}>
                <TextField sx={{ marginTop: "50px" }} fullWidth label="Tiêu đề" id="fullWidth" value={lyThuyet.TieuDe} onChange={e => setLyThuyet({ ...lyThuyet, TieuDe: e.target.value })} />
                <div className={cx('noiDung')}>
                    <p>Nội dung</p>
                    <CKEditor
                        editor={ClassicEditor}
                        height="700px"
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "400px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setLyThuyet({ ...lyThuyet, NoiDung: data });
                        }}

                    />
                </div>

                <Button variant="contained" style={{ backgroundColor: "ButtonShadow" }}
                    endIcon={<CancelIcon />}
                    onClick={() => {
                        console.log('Hủy')
                    }}
                >
                    Hủy
                </Button>

                <Button variant="contained" style={{ marginLeft: "20px" }}
                    endIcon={<SaveIcon />}
                    onClick={() => handleAddLT()}
                >
                    Lưu
                </Button>
            </div>
        </>
    )
}

export default CreateLyThuyet;
