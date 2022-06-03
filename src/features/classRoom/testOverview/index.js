import React, {useState,useEffect} from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import classNames from 'classnames/bind'
import styles from './testOverview.module.css'
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import BaiLamkiemTraAPI from '../../../apis/baiLamKiemTraAPI';
import DetailTest from './detailTest';
import DeKiemTraAPI from '../../../apis/deKiemTraAPI';

const cx = classNames.bind(styles);

function TestOverview() {
    
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [rows,setRows] = useState([]);
    const [rowSelect,setRowSelect] = useState({});
    const [testName,setTestName] = useState('');
    const colums = [
        { field: 'id', headerName: 'STT', width: 30 },
        { field: 'uid', headerName: 'uId', width: 250 },
        { field: 'idBaiLam', headerName: 'Id', width: 50 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 175 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 175 },
        { field: 'thoiGianNop', headerName: 'Thời gian nộp', width: 250 },
        { field: 'diem', headerName: 'Điểm', width: 50 },
        { field: 'chiTiet', headerName: 'Chi tiết', width: 70,renderCell: (params)=>{
            const onClick = (e)=> {
                e.stopPropagation();
                setOpen(true);
                setRowSelect(params.row);
            }
            return (
                <div onClick={onClick} style={{width:'100%', height:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <InfoIcon  sx={{
                        '&:hover': {
                            color: '#1976d2'}
                        ,color:"#6c6464"}}
                    />
                </div>)}
            , align: 'center'
        }
    ]
    useEffect(() => {
        let mounted = true;

        const getData = async () =>{
            try {
                const response = await BaiLamkiemTraAPI.getTestOverview(params.idTest);
                setRows(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        
        const getName = async() => {
            try {
                const response = await DeKiemTraAPI.getOneById(params.idTest);
                setTestName(response.data.moTa);
            } catch (error) {
                console.log(error)
            }
        }
        if(mounted)
        {
            getData();
            getName();
        }
        
        return () => mounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1>Tổng quan {testName}</h1>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-table')}>
                <DataGrid
                        autoHeight
                        rows={rows}
                        columns={colums}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        components={{
                            Toolbar: GridToolbar
                        }}
                        localeText={{
                            toolbarColumns: "Cột",
                            toolbarFilters: "Tìm kiếm",
                            toolbarDensity: "Kích thước",
                            toolbarDensityLabel: 'Kích thước',
                            toolbarDensityCompact: 'Nhỏ',
                            toolbarDensityStandard: 'Trung Bình',
                            toolbarDensityComfortable: 'Lớn',
                            toolbarExport: "Xuất file",
                            filterPanelInputLabel: 'Giá trị',
                            filterPanelColumns: 'Cột',
                            filterPanelOperators: 'So sánh'
                        }}
                    />

                </div>
            </div>
            <Dialog
                open={open}
                fullWidth
                maxWidth='lg' 
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{color: '#6F767A'}}>Chi tiết bài làm của  {rowSelect.tenHienThi} </DialogTitle>
                <DialogContent dividers>
                    <DetailTest idBaiLam={rowSelect.idBaiLam} totalScore={rowSelect.diem} />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>THOÁT</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TestOverview;
