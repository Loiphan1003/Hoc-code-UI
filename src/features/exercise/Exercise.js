import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Exercise.module.css';
import BaiTapCodeAPI from '../../apis/baiTapCodeAPI'
import BaiTapTN from '../../apis/baiTapTN_API'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImportBTCode from './importBTcode';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Exercise(props) {
    const [rows, setRows] = useState([])
    const [rowsTN, setRowsTN] = useState([])
    const navigate = useNavigate();
    const [dataImport, setDataImport] = useState([]);
    const [reset, setReset] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [deleteAction, setDeleteAction] = useState({
        isBTCode: false,
        id: 1
    });
    const uId = JSON.parse(localStorage.getItem('uId')); 

    useEffect(() => {
        const getAllBTCode = async () => {
            try {
                const response = await BaiTapCodeAPI.getAll();
                setRows(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        getAllBTCode();

        const getAllBTTN = async () => {
            try {
                const response = await BaiTapTN.getAll();
                setRowsTN(response.data)
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        getAllBTTN();

    }, []);


    console.log(dataImport);

    useEffect(() => {
        if (reset === true) {
            const getAllBTCode = async () => {
                try {
                    const response = await BaiTapCodeAPI.getAll();
                    setRows(response.data)
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getAllBTCode();

            const getAllBTTN = async () => {
                try {
                    const response = await BaiTapTN.getAll();
                    setRowsTN(response.data)
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            setReset(false);
            getAllBTTN();
            return;
        }

    }, [reset]);


    const deleteBTCode = (id) => {
        setOpen(true);
        setDeleteAction({
            isBTCode: true,
            id: id
        });

    };

    const deleteBTTN = (id) => {
        setOpen(true);
        setDeleteAction({
            isBTCode: false,
            id: id
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addBTCode = async (ob) => {
        try {
            const response = await BaiTapCodeAPI.postAddBaiTapCode(ob);
            if(response.data)
                alert(`Thêm bài tập có tiêu đề : ${ob.tieuDe} thành công!`)
            console.log(response.data);
        } catch (error) {
            console.log("Fetch data error: ", error);
        }
    }

    const handleAddListBTCode = () => {
        
        dataImport.forEach((data) =>{

            let baiTapCode = {
                tieuDe: data.shift().toString(),
                deBai: data.shift().toString(),
                rangBuoc: data.shift().toString(),
                dinhDangDauVao: data.shift().toString(),
                dinhDangDauRa: data.shift().toString(),
                mauDauVao: data.shift().toString(),
                mauDauRa: data.shift().toString(),
                ngonNgu: data.shift().toString(),
                uIdNguoiTao: uId,
                
            };
            let testCase = [];
            while(data.length > 0)
            {
                if(data[0] !== ''){
                    testCase.push({
                        Input: data.shift().toString(),
                        Output: data.shift().toString(),
                    })
                }
                else
                    break;
                
            }
            baiTapCode = {
                ...baiTapCode,
                testCases: testCase
            }
            addBTCode(baiTapCode)

        })
        setDataImport([]);
    }


    const handleDelete = () => {
        if (deleteAction.isBTCode) {
            const dBTCode = async () => {
                try {
                    const response = await BaiTapCodeAPI.deleteBaiTapCode(deleteAction.id);
                    if (response.data) {
                        console.log("Xóa bài tập TN thành công!");
                        setRows(pre => pre.filter(item => item.id !== deleteAction.id))
                    }

                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            dBTCode();
            console.log("Xóa bài tập code id = ", deleteAction.id);
        }
        else {
            const dBTTN = async () => {
                try {
                    const response = await BaiTapTN.deleteBaiTapTN(deleteAction.id);
                    if (response.data) {
                        console.log("Xóa bài tập TN thành công!");
                        setRowsTN(pre => pre.filter(item => item.id !== deleteAction.id))
                    }
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            dBTTN();
            console.log("Xóa bài tập trắc nghiệm id = ", deleteAction.id);
        }
        setOpen(false);
    }

    return (
        <>
            <div className={styles.container}>

                {/* table câu hỏi code */}
                <div className={styles.TableCauHoiCode}>
                    <div>
                        <h2>Câu hỏi code</h2>

                        <ImportBTCode data={setDataImport} style={{marginBottom: "20px", float: "right"}} />

                        <Button sx={{ marginBottom: "20px", marginRight: "20px", float: "right" }} variant="contained"
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => {
                                navigate('/exercise/create')
                            }}>
                            Tạo bài tập code
                        </Button>
                    </div>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">Tiêu Đề</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">Ngôn ngữ</TableCell>
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
                                            {row.ngonNgu}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                                onClick={() => deleteBTCode(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell align="center" >
                                            <ModeEditIcon sx={{ cursor: "pointer" }}
                                                onClick={() => console.log("Edit - ", row.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* table câu hỏi trắc nghiệm */}
                <div className={styles.TableCauHoiCode}>
                    <div>
                        <h2>Câu hỏi trắc nghiệm</h2>
                        <Button sx={{ marginBottom: "20px", float: "right" }} variant="contained"
                            endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => {
                                navigate('/exercise/multiplechoice')
                            }}
                        >
                            Tạo bài tập trắc nghiệm
                        </Button>
                    </div>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">Câu hỏi</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="center">Đáp án</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Xóa</TableCell>
                                    <TableCell sx={{ width: 40, fontWeight: "700" }} align="center">Sửa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTN.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row" >{row.id}</TableCell>
                                        <TableCell className={styles.conten_cell} align="center" style={{ minWidth: "200px" }} dangerouslySetInnerHTML={{ __html: row.cauHoi }} />
                                        <TableCell align="center" >{row.dapAn}</TableCell>
                                        <TableCell align="center" >
                                            <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                                onClick={() => deleteBTTN(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell align="center" >
                                            <ModeEditIcon sx={{ cursor: "pointer" }}
                                                onClick={() => console.log("Edit TN - ", row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Dialog
                    open={dataImport.length > 0}
                    fullWidth
                    maxWidth='xl' 
                    onClose={() => setDataImport([])}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title" sx={{color: '#6F767A'}}>Các câu hỏi đã thêm</DialogTitle>
                    <DialogContent  dividers >
                        
                            <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: '5%', fontWeight: "700" }}>STT</TableCell>
                                            <TableCell sx={{width: '20%', fontWeight: "700" }} align="center">Tên bài</TableCell>
                                            <TableCell sx={{width: '20%', fontWeight: "700" }} align="center">Đề bài</TableCell>
                                            <TableCell sx={{width: '10%', fontWeight: "700" }}>Ràng buộc</TableCell>
                                            <TableCell sx={{width: '10%', fontWeight: "700" }}>Định dạng đầu vào</TableCell>
                                            <TableCell sx={{width: '10%', fontWeight: "700" }}>Định dạng đầu ra</TableCell>
                                            <TableCell sx={{width: '10%', fontWeight: "700" }}>Mẫu đầu vào</TableCell>
                                            <TableCell sx={{width: '10%', fontWeight: "700" }}>Mẫu đầu ra</TableCell>
                                            <TableCell sx={{width: '5%', fontWeight: "700" }} align="center">Xóa</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataImport.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                                <TableCell className={styles.conten_cell} align="center" style={{ minWidth: "200px" }}>{row[0]}</TableCell>
                                                <TableCell align="center" >{row[1]}</TableCell>
                                                <TableCell >
                                                    {row[2]}
                                                </TableCell>
                                                <TableCell  >
                                                    {row[3]}
                                                </TableCell>

                                                <TableCell  >
                                                    {row[4]}
                                                </TableCell>

                                                <TableCell  >
                                                    {row[5]}
                                                </TableCell>

                                                <TableCell  >
                                                    {row[6]}
                                                </TableCell>

                                                <TableCell align="center" >
                                                    <DeleteIcon sx={{ cursor: "pointer", color: "#f04530" }}
                                                        onClick={() => console.log(index)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleAddListBTCode()}>LƯU</Button>
                        <Button onClick={() => setDataImport([])}>THOÁT</Button>
                    </DialogActions>
                </Dialog>


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
            </div>
        </>

    );
}

export default Exercise;