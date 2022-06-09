import React, { useState} from 'react';
import styles from './CreateTest.module.css';
import classNames from 'classnames/bind'
import { Button } from '@mui/material';
import 'antd/dist/antd.css';
import { DatePicker, } from 'antd';
import moment from 'moment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import createTestSlice from '../../../redux/createTestSlice';
import ItemQuestion from './ItemQuestion';
import { useParams, useNavigate } from 'react-router-dom';

import DeKiemTraAPI from '../../../apis/deKiemTraAPI';



const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);


function getType(params) {
    return params.row.loaiBai === 0 ? "Trắc nghiệm" :"Code";
}

const colums = [
    { field: 'idBt', headerName: 'ID', flex:0.3 },
    { field: 'tenBai', headerName: 'Tên bài', flex:1 },
    { field: 'loaiBai', headerName: 'Loại', flex:0.5 ,valueGetter: getType},
]

const GridToolbarCustom = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

function CreateTest(props) {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [nameTest, setNameTest] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [questionSelecteds,setQuestionSelecteds] = useState([]);
    const [openBackDrop, setopenBackDrop] = useState(false);
    const uId = JSON.parse(localStorage.getItem('uId')); 

    const [rows, setRows] = useState([]);


    const questions = useSelector((state) => state.createTest.questions)

    const handleSave = () => {
        const lsCauHoi = questions.map((item, index) => ({
            id: parseInt(item.id),
            stt: index + 1,
            diem: parseFloat(item.diem),
            loaiCauHoi: item.loaiCauHoi
        }))
        const baiKiemTra = {
            ngayBatDau: startDate,
            ngayKetThuc: endDate,
            moTa: nameTest,
            idPhong: params.idPhong,
            trangThai: 0,
            listCauHoi: lsCauHoi
        }
        const addDeKiemTra = async () => {
            try {
                const response = await DeKiemTraAPI.add(baiKiemTra);
                console.log(response.data);
                if (response.data) {
                    alert("Thêm bài kiểm tra thành công!");
                    dispatch(createTestSlice.actions.clearQuestion([]));
                    navigate(-1)
                }

            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        addDeKiemTra();

    }

    const handleCloseBdrop = () => {
        setopenBackDrop(false);
    };

    const handleClickAdd = () => {
        if (!!uId) {
            try {
                const data = async () => {
                    const response = await DeKiemTraAPI.getListCauHoi(uId);
                    const convert  = response.data.map((item,index)=> ({
                        id: index,
                        idBt:item.id,
                        loaiBai: item.loaiBai,
                        tenBai: item.tenBai
                    }))
                    const fillter  = convert.filter(item => {
                        return !(!!questions.find(({id,loaiCauHoi}) => {
                            return item.loaiBai === loaiCauHoi && item.idBt === id;
                        }));
                    }) 
                    setRows(fillter);
                }
                data();
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        setopenBackDrop(true)
    }

    const handleAccept = () => {
        
        dispatch(createTestSlice.actions.addQuestion(
            questionSelecteds.map((item) => ({
                id: item.idBt,
                diem: 0,
                loaiCauHoi: item.loaiBai
            }))
        ))
        setopenBackDrop(false);
    }

    return (
        <>
            <div className={cx('header')}>
                <h2 >{!!nameTest ? nameTest : "Tên bài kiểm tra..."}</h2>
                <Button variant="contained" onClick={handleSave}>
                    Lưu bài
                </Button>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-center')}>
                    <input className={cx('input-nameTest')} value={nameTest}
                        type='text' placeholder='Nhập tên bài kiểm tra'
                        onChange={(e) => setNameTest(e.target.value)}
                    >
                    </input>
                    <div className={cx('content-describe')}>
                        <h3 className={cx('title-row')}>Ngày bắt đầu Ngày kết thúc</h3>
                        <RangePicker
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={(dates, dateStrings) => {
                                setStartDate(dateStrings[0]);
                                setEndDate(dateStrings[1]);
                            }}
                        />
                    </div>

                    <div className={cx('content-questions')}>
                        <h3 className={cx('title-row')}>Các câu hỏi trong bài kiểm tra</h3>
                        {
                            questions.map((item, index) => (
                                <ItemQuestion key={index} data={item} index={index} />
                            ))
                        }

                    </div>

                    <div className={cx('add-question')}>
                        <button className={cx('btn-add-question')} onClick={() => handleClickAdd()} >
                            <AddCircleIcon sx={{ fontSize: "19px" }} />
                            Thêm Câu Hỏi
                        </button>
                    </div>


                </div>

                <Dialog open={openBackDrop} onClose={handleCloseBdrop} fullWidth maxWidth='lg'
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description" >
                    <DialogTitle>Thêm bài tập</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Chọn câu hỏi bài tập bạn muốn thêm.
                        </DialogContentText>

                        <DataGrid
                            rows={rows}
                            columns={colums}
                            autoHeight
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            components={{
                                Toolbar: GridToolbarCustom
                            }}
                            checkboxSelection
                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRowData = rows.filter((row) =>
                                    selectedIDs.has(row.id) )
                                setQuestionSelecteds(selectedRowData);
                            }}

                            localeText={{
                                toolbarColumns: "Cột",
                                toolbarFilters: "Tìm kiếm",
                                toolbarDensity: "Độ cao",
                                toolbarExport: "Xuất file",
                                filterPanelInputLabel: 'Giá trị',
                                filterPanelColumns: 'Cột',
                                filterPanelOperators: 'So sánh'
                            }}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseBdrop}>Hủy</Button>
                        <Button onClick={handleAccept}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default CreateTest;