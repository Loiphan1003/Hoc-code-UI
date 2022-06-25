import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuanlyBTLT.module.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../../components/Backdrop';
import TestCaseBTLT from '../../apis/testCaseBTLT';

function QuanlyBTLT() {
    const [resetBT, setResetBT] = useState(true);
    const [resetTC, setResetTC] = useState(true);
    const [id, setID] = useState(0)
    const [doKho, setDoKho] = useState(1)
    const [tieuDe, setTieuDe] = useState("")
    const [deBai, setDeBai] = useState("")
    const [rangBuoc, setRangBuoc] = useState("")
    const [dinhDangDauVao, setDinhDangDauVao] = useState("")
    const [dinhDangDauRa, setDinhDangDauRa] = useState("")
    const [mauDauVao, setMauDauVao] = useState("")
    const [mauDauRa, setMauDauRa] = useState("")
    const [tag, setTag] = useState("")
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [idTC, setIdTC] = useState();
    const [testCases, setTestCases] = useState([]);
    const [openTestCase, setOpenTestCase] = useState(false);
    const [changeTestCase, setChangeTestCase] = useState(false);
    const [rows, setRows] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
    };
    const navigate = useNavigate();
    const [deleteAction,setDeleteAction] = useState({
        isBTCode:false,
        id: 1
    });
    const deleteBTCode = (id) => {
        setOpen(true);
        setDeleteAction({
            isBTCode:true,
            id: id
        });
    };
    const editBTCode = (id, doKho, tieuDe, deBai, rangBuoc, dinhDangDauVao, dinhDangDauRa, mauDauVao, mauDauRa, tag) => {
        setResetTC(!resetTC);
        setOpenEdit(true);
        setID(id);
        setDoKho(doKho);   
        setTieuDe(tieuDe);
        setDeBai(deBai);
        setRangBuoc(rangBuoc);
        setDinhDangDauVao(dinhDangDauVao);
        setDinhDangDauRa(dinhDangDauRa);
        setMauDauVao(mauDauVao);
        setMauDauRa(mauDauRa);
        setTag(tag);
    };

    useEffect(() => {
        const getAddBTLT = async () => {
            try {
                const response = await BaiTapLuyenTapAPI.getAllByAdmin();
                setRows(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error)
            }
        }
        getAddBTLT();
    }, [resetBT]);

    useEffect(() => {
        const getAllTestcase = async () => {
            try {
                const response = await TestCaseBTLT.getTestCasesByID(id)
                setTestCases(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error)
            }
        }
        getAllTestcase();
    }, [resetTC,id]);

    const handleDelete = () => {
        if(deleteAction.isBTCode)
        {
            console.log(deleteAction.isBTCode)
            const dBTCode = async () => {
                try {
                    const response = await BaiTapLuyenTapAPI.DeleteBTLT(deleteAction.id);
                    console.log(response.data)
                    if(response.data)
                    {
                        setRows(pre => pre.filter( item => item.id !== deleteAction.id))
                    }
                    
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            dBTCode();
        }
        setOpen(false);
    }
    const handleSaveExercise = () => {
        console.log(doKho);
        const editBTCode = async () => {
            try {
                if(doKho === "" || tieuDe === "" || deBai === "" || rangBuoc === "" || dinhDangDauVao === "" || dinhDangDauRa === "" || mauDauVao === "" || mauDauRa === "" || tag === "")
                {
                    alert("Vui lòng nhập đầy đủ thông tin");
                }
                else
                {
                    const response = await BaiTapLuyenTapAPI.EditBTLT(id, doKho, tieuDe, deBai, rangBuoc, dinhDangDauVao, dinhDangDauRa, mauDauVao, mauDauRa, tag);
                    if(response.data)
                    {
                        alert("Sửa bài tập luyện tập thành công!");
                        setOpenEdit(false);
                        setResetBT(!resetBT);
                    }
                }
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        editBTCode();
    }
    const editTestCase = (id, input, output) => {
        setChangeTestCase(true);
        setIdTC(id);
        setInput(input);
        setOutput(output);
    }
    const handleRemoveInput = (id) => {
        const deleteTestCase = async () => {
            try {
                await TestCaseBTLT.DeleteTestCase(id);
                setResetTC(!resetTC);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        deleteTestCase();
    }

    const handleAddTestCase = () => {
        const addTestCase = async () => {
            try {
                if(input === "" || output === "")
                {
                    alert("Chưa nhập đầy đủ thông tin");
                }
                else
                {
                    const response = await TestCaseBTLT.AddTestCase(input, output, id);
                    if(response.data)
                    {
                        alert("Thêm test case thành công!")
                        setOpenTestCase(false);
                        setInput("");
                        setOutput("");
                        setResetTC(!resetTC);
                    }
                }
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        addTestCase();
    }

    const handleEditTestCase = () =>{
        const editTestCase = async () => {
            try {
                if(input === "" || output === "")
                {   
                    alert("Chưa nhập đầy đủ thông tin")
                }
                else
                {
                    const response = await TestCaseBTLT.EditTestCase(idTC, input, output);
                    if(response.data)
                    {
                        alert("Sửa test case thành công!")
                        setChangeTestCase(false);
                        setInput("");
                        setOutput("");
                        setResetTC(!resetTC);
                    }    
                }
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        editTestCase();
    }
    const CloseEditBTLT = () => {
        setOpenEdit(false);
        setID(0);
        setDoKho(1);
        setTieuDe("");
        setDeBai("");
        setRangBuoc("");
        setDinhDangDauVao("");
        setDinhDangDauRa("");
        setMauDauVao("");
        setMauDauRa("");
        setTag("");
    }
    return (
        <div className={styles.container}>
        {/* table câu hỏi code */}
            <div className={styles.TableCauHoiCode}>
                <div>
                    <h2>Câu hỏi code luyện tập</h2>
                    <Button sx={{ marginBottom: "20px", float: "right" }} variant="contained"
                        endIcon={<AddCircleOutlinedIcon />}
                        onClick={() => {
                            navigate('/Admin/CreateBTCode')
                        }}>
                        Tạo bài tập code luyện tập
                    </Button>
                </div>
                <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: 40, fontWeight: "700" }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: "700" }} align="center">Tiêu Đề</TableCell>
                                <TableCell sx={{ fontWeight: "700" }} align="center">Cấp độ</TableCell>
                                <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Xóa</TableCell>
                                <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Sửa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row" >{row.id}</TableCell>
                                    <TableCell align="center" >{row.tieuDe}</TableCell>
                                    <TableCell align="center" >
                                        {row.doKho === 1 ? "Dễ" :
                                            (row.doKho === 2 ? "Trung bình" : "Khó")}
                                    </TableCell>
                                    <TableCell align="center" >
                                        <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                            onClick={() => deleteBTCode(row.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="center" >
                                        <ModeEditIcon sx={{ cursor: "pointer" }}
                                            onClick={() => editBTCode(row.id, row.doKho, row.tieuDe, row.deBai, row.rangBuoc, row.dinhDangDauVao, row.dinhDangDauRa, row.mauDauVao, row.mauDauRa, row.tag)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {/* mở màn hình xác nhận xóa */}
            <Dialog
                open={open}
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
                        {deleteAction.isBTCode ? " bài tập code ":" bài tập trắc nghiệm "} có 
                        <span style={{fontWeight:"bold",color:"#f04530"}}> ID: { deleteAction.id} </span>
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
            {/* màn hình edit bài tập */}
            <Dialog
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.content} >
                    <br></br>
                    <h1>Chỉnh sửa thông tin bài tập</h1>
                    <div className={styles.exxercise_discription} >
                        <TextField value={tieuDe} onChange={(e) => setTieuDe(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Tên bài tập" multiline />
                        <TextField value={deBai} onChange={(e) => setDeBai(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Đề bài" multiline />
                        <TextField value={rangBuoc} onChange={(e) => setRangBuoc(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Ràng buộc" multiline />
                        <TextField value={dinhDangDauVao} onChange={(e) => setDinhDangDauVao(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Định dạng đầu vào" multiline />
                        <TextField value={dinhDangDauRa} onChange={(e) => setDinhDangDauRa(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Định dạng đầu ra" multiline />
                        <TextField value={mauDauVao} onChange={(e) => setMauDauVao(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Mẫu đầu vào" multiline />
                        <TextField value={mauDauRa} onChange={(e) => setMauDauRa(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Mẫu đầu ra" multiline />
                        <TextField value={tag} onChange={(e) => setTag(e.target.value)} sx={{marginTop:"20px"}} fullWidth label="Tag" multiline />
                    </div>
                    <div className={styles.exercise_level} >
                        <FormControl fullWidth>
                            <InputLabel id="level-label">Cấp độ</InputLabel>
                            <Select
                                labelId="level-label"
                                value={doKho}
                                label="Cấp độ"
                                onChange={e => setDoKho(e.target.value)}
                                
                            >
                                <MenuItem value={1}>Dễ</MenuItem>
                                <MenuItem value={2}>Trung bình</MenuItem>
                                <MenuItem value={3}>Khó</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.content_TestCase} >
                            <Button  variant="contained" className={styles.btnAddTestCase}
                                endIcon={<AddCircleOutlinedIcon />}
                                onClick={() => setOpenTestCase(true)}
                            >
                                Thêm TestCase
                            </Button>
                        {testCases.map((testcase, index) => (
                            <div className={styles.testcase} key={index} >
                                <div className={styles.name_input} >
                                    TestCase #{index + 1}
                                </div>
                                <div className={styles.testcase_btn} >
                                    <FontAwesomeIcon className={styles.btn_update} icon={faPen} onClick={() => editTestCase(testcase.id, testcase.input, testcase.output)}/>
                                    <FontAwesomeIcon className={styles.btn_delete} icon={faTrashCan} onClick={() => handleRemoveInput(testcase.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* nút hủy và lưu của from sửa */}
                    <div className={styles.exercise_btn} >
                        <Button  variant="contained" style={{backgroundColor:"darkgray"}}
                            endIcon={<CancelIcon />}
                            onClick={CloseEditBTLT}
                        >
                            Hủy
                        </Button>
                        <Button  variant="contained" style={{marginLeft:"20px"}}
                            endIcon={<SaveIcon />}
                            onClick={handleSaveExercise}
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
                {/* màn hình thêm test case */}
                {openTestCase && <Backdrop onClick={() => setOpenTestCase(false)} />}
                {openTestCase && <div className={styles.input_testcase} >
                    <h2>NHẬP TESTCASE</h2>
                    <div>
                        <TextField className={styles.input_output}  label="Đầu vào" 
                            placeholder="Nhập đầu vào (input)" value={input}
                            multiline onChange= {e => setInput(e.target.value)}/>
                        <div style={{width:"100%", height:"20px"}}></div>
                        <TextField className={styles.input_output} label="Đầu ra" 
                            placeholder="Nhập đầu ra (output)" value={output}
                            multiline onChange= {e => setOutput(e.target.value)}/>
                    </div>
                    <div className={styles.btn_intputTestCase} >
                        <Button  variant="contained" style={{backgroundColor:"darkgray"}}
                            endIcon={<CancelIcon />}
                            onClick={() => setOpenTestCase(false)}
                        >
                            Hủy
                        </Button>

                        <Button  variant="contained" style={{marginLeft:"20px"}}
                            endIcon={<SaveIcon />}
                            onClick={handleAddTestCase}
                        >
                            Lưu
                        </Button>
                    </div>
                </div>}
                {/* màn hình sửa test case */}
                {changeTestCase && <Backdrop onClick={() => setChangeTestCase(false)} />}
                {changeTestCase && <div className={styles.input_testcase} >
                    <h2>SỬA TESTCASE</h2>
                    <div>
                        <TextField className={styles.input_output}  label="Đầu vào" 
                            placeholder="Nhập đầu vào (input)" value={input}
                            multiline onChange= {e => setInput(e.target.value)}/>
                        <div style={{width:"100%", height:"20px"}}></div>
                        <TextField className={styles.input_output} label="Đầu ra" 
                            placeholder="Nhập đầu ra (output)" value={output}
                            multiline onChange= {e => setOutput(e.target.value)}/>
                    </div>
                    <div className={styles.btn_intputTestCase} >
                        <Button  variant="contained" style={{backgroundColor:"darkgray"}}
                            endIcon={<CancelIcon />}
                            onClick={() => setChangeTestCase(false)}
                        >
                            Hủy
                        </Button>

                        <Button  variant="contained" style={{marginLeft:"20px"}}
                            endIcon={<SaveIcon />}
                            onClick={handleEditTestCase}
                        >
                            Lưu
                        </Button>
                    </div>
                </div>}
            </Dialog>
        </div>
    )
}

export default QuanlyBTLT