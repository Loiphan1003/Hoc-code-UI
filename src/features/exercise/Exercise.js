import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';

import styles from './Exercise.module.css';
// import { Fragment } from 'react';

function createDataCauHoiCode(id, tieuDe, noiDung, capDo) {
    return { id, tieuDe, noiDung, capDo };
}

function createDataCauHoiTN(id, cauHoi, tl1, tl2, tl3, tl4, dapAn) {
    return { id, cauHoi, tl1, tl2, tl3, tl4, dapAn };
}

function Exercise(props) {

    const rows = [
        createDataCauHoiCode(1, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Dễ"),
        createDataCauHoiCode(2, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(3, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(4, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(5, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(6, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(7, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(8, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
        createDataCauHoiCode(9, "Cộng hai số", "<h2>Cộng hai số từ bàn phím</h2>", "Dễ"),
    ];
    const rowsTN = [
        createDataCauHoiTN(1, "Lập trình C là gì", "A", "B", "C", "D", "A"),
        createDataCauHoiTN(2, "Lập trình C là gì", "A", "B", "C", "D", "A"),
        createDataCauHoiTN(3, "Lập trình C là gì", "A", "B", "C", "D", "A"),
        createDataCauHoiTN(4, "Lập trình C là gì", "A", "B", "C", "D", "A"),
    ]
    const navigate = useNavigate();





    return (
        <>
            <div className={styles.container}>
                <div className={styles.TableCauHoiCode}>
                    <div>
                        <h2>Câu hỏi code</h2>
                        <Button className={styles.btnTaoBai} variant="contained"
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
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Tiêu Đề</TableCell>
                                    <TableCell align="center">Nội dung</TableCell>
                                    <TableCell align="center">Cấp độ</TableCell>
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
                                            {row.noiDung}
                                        </TableCell>
                                        <TableCell align="center" >{row.capDo}</TableCell>
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
                        <Button className={styles.btnTaoBai} variant="contained"
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
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Câu hỏi</TableCell>
                                    <TableCell align="center">Câu trả lời 1</TableCell>
                                    <TableCell align="center">Câu trả lời 2</TableCell>
                                    <TableCell align="center">Câu trả lời 3</TableCell>
                                    <TableCell align="center">Câu trả lời 4</TableCell>
                                    <TableCell align="center">Đáp án</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTN.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row" >{row.id}</TableCell>
                                        <TableCell align="center" style={{ minWidth: "200px" }} >{row.cauHoi}</TableCell>
                                        <TableCell align="center" >{row.tl1}</TableCell>
                                        <TableCell align="center" >{row.tl2}</TableCell>
                                        <TableCell align="center" >{row.tl3}</TableCell>
                                        <TableCell align="center" >{row.tl4}</TableCell>
                                        <TableCell align="center" >{row.dapAn}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>

    );
}

export default Exercise;