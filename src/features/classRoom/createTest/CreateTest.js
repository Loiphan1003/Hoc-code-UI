import React, { useState, useEffect} from 'react';
import styles from './CreateTest.module.css';
import classNames from 'classnames/bind'
import { Button } from '@mui/material';
import 'antd/dist/antd.css';
import { DatePicker, } from 'antd';
import HeadlessTippy from "@tippyjs/react/headless";
import moment from 'moment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useSelector, useDispatch } from 'react-redux';
import createTestSlice from '../../../redux/createTestSlice';
import ItemQuestion from './ItemQuestion';
import useDebounce from '../../../hooks/useDebounce'
import {  } from '@fortawesome/free-solid-svg-icons';
import InputAdornment from '@mui/material/InputAdornment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import BaiTapTN from '../../../apis/baiTapTN_API';
import BaiTapCodeAPI from '../../../apis/baiTapCodeAPI';
import DeKiemTraAPI from '../../../apis/deKiemTraAPI';
const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);


function CreateTest(props) {
    const dispatch = useDispatch();
    
    const [nameTest,setNameTest] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [typeQuestion,setTypeQuestion] = useState();
    const [scores,setScores] = useState(1);
    const [idQuestion,setIdQuestion] = useState('');
    const [searchResult,setSearchResult] = useState([]);
    const [searchValue,setSearchValue] = useState({
        search:'',
        selectValue:''
    });

    const [openButtonAdd, setOpenButtonAdd] = useState(false);
    const [openBackDrop, setopenBackDrop] = useState(false);

    const debounece = useDebounce(searchValue.search,600)

    useEffect(() => {
        if(!debounece.trim())
        {
            setSearchResult([])
            return;
        }
        if(typeQuestion === 0){
            // call api TN
            const getResultSearchTN = async () => {
                try {
                    const response = await BaiTapTN.searchBaiTapTN(debounece);
                    setSearchResult(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getResultSearchTN();
        }
        else{
            // call api code
            const getResultSearchCode = async () => {
                try {
                    const response = await BaiTapCodeAPI.searchBaiTapCode(debounece);
                    setSearchResult(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getResultSearchCode();
        }
        console.log("debounce",debounece)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounece]);

    const questions = useSelector((state) => state.tests.questions)

    const handleSave = () => {
        const lsCauHoi = questions.map( (item,index) => ({
            id:parseInt(item.id),
            stt: index+1,
            diem: parseFloat(item.diem),
            loaiCauHoi: item.loaiBai
        }))
        const baiKiemTra = {
            ngayBatDau: startDate,
            ngayKetThuc: endDate,
            moTa:nameTest,
            idPhong:1,
            trangThai:0,
            listCauHoi: lsCauHoi
        }
        const addDeKiemTra = async()=>{
            try {
                const response = await DeKiemTraAPI.add(baiKiemTra);
                console.log(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        addDeKiemTra();

    }

    const handleSelectIdQuestion = (item) => {
        setIdQuestion(item.id)
        setSearchValue({
            search:'',
            selectValue: 'ID:'+item.id+' '+item.moTa
        })
        setSearchResult([])
    }

    const handleCloseBdrop = () => {
        setIdQuestion('')
        setSearchValue({
            search:'',
            selectValue: ''
        })
        setScores('1')
        setSearchResult([])
        setopenBackDrop(false);
        
    };
    
    const handleClickItemAdd = (loaiBai) => {
        setTypeQuestion(loaiBai)
        setOpenButtonAdd(p => !p)
        setopenBackDrop(p => !p)
    }

    const handleAccept = () => {
        if(idQuestion === '')
            return
        dispatch(createTestSlice.actions.addQuestion({
            id:idQuestion,
            diem:scores,
            loaiCauHoi:typeQuestion
        }))
        setSearchValue({
            search:'',
            selectValue: ''
        })
        setScores('1')
        setIdQuestion('')
        setSearchResult([])
        setopenBackDrop(false);
    }
    
    return (
        <>
            <div className={cx('header')}>
                <h2 >{!!nameTest ? nameTest :"Tên bài kiểm tra..."}</h2>
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
                            questions.map( (item,index) => (
                                <ItemQuestion key={index} data={item} index={index}/>
                            ))
                        }
                        
                    </div>

                    <div className={cx('add-question')}>
                        <HeadlessTippy
                            visible={openButtonAdd}
                            interactive
                            render={() => (
                                <div className={cx('content-btn-add')}>
                                    <div className={cx('title-btn-add')}>
                                        <MenuBookIcon fontSize='5px' />
                                        Chọn loại câu hỏi
                                    </div>
                                    <div className={cx('item-btn-add')} onClick={() => handleClickItemAdd(1)}>
                                        <CodeIcon fontSize='5px' />
                                        <p>Bài tập code</p>
                                    </div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('item-btn-add')} onClick={() => handleClickItemAdd(0)}>
                                        <RadioButtonCheckedIcon fontSize='5px' />
                                        <p>Bài tập trắc nghiệm</p>
                                    </div>
                                </div>
                            )}
                            placement={'top-start'}
                            onClickOutside={() => setOpenButtonAdd(p => !p)}
                        >
                            <button className={cx('btn-add-question')} onClick={() => setOpenButtonAdd(p => !p)} >
                                <AddCircleIcon sx={{ fontSize: "19px" }} />
                                Thêm Câu Hỏi
                                {
                                    openButtonAdd ? <ArrowDropDownIcon sx={{ fontSize: "19px" }} />
                                        : <ArrowDropUpIcon sx={{ fontSize: "19px" }} />
                                }
                            </button>
                        </HeadlessTippy>
                    </div>


                </div>
                
                <Dialog open={openBackDrop} onClose={handleCloseBdrop} >
                    <DialogTitle>Thêm bài tập {typeQuestion === 0 ? 'Trắc nghiệm':'Code'}</DialogTitle>
                    <DialogContent style={{height:"180px",width:"500px"}}>
                        <DialogContentText>
                            Nhập ID hoặc câu hỏi bài tập bạn muốn thêm.
                        </DialogContentText>

                        <div>
                            <HeadlessTippy
                                visible={searchResult.length > 0}
                                interactive
                                render={() => (
                                    <div className={cx('search-result')}>
                                    {
                                        searchResult.map((item) => 
                                        (   
                                            <div className={cx('item-search-res')} key={item.id} onClick={() => handleSelectIdQuestion(item)}>
                                                <AutoStoriesIcon fontSize=''/>
                                                <span style={{fontWeight:"bold", marginLeft:"3px"}}>ID:</span>
                                                <span>{item.id}</span>
                                                <span className={cx('item-res-nameAns')}>
                                                    {item.moTa}
                                                </span>
                                            </div>
                                        ))
                                        
                                    }
                                    </div>
                                )}
                                placement={'bottom-start'}
                                // onClickOutside={() => setVisible(p => !p)}
                            >
                                <TextField
                                    value={searchValue.selectValue === '' ? searchValue.search : searchValue.selectValue}
                                    onChange={(e) => {
                                        setSearchValue({
                                            search:e.target.value,
                                            selectValue:''})
                                    }}
                                    margin="dense"
                                    label="ID hoặc Câu hỏi"
                                    type="text"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start" className={cx('icon-x')} 
                                                onClick={()=> {
                                                    setSearchValue({
                                                        search:'',
                                                        selectValue:''})
                                                    setIdQuestion('')
                                                }}
                                            >
                                                <HighlightOffIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    variant="standard">
                                </TextField>
                            </HeadlessTippy>
                        </div>

                        <TextField variant="standard" 
                            defaultValue={1}
                            onChange={(e) => setScores(e.target.value)}
                            fullWidth label="Nhập điểm" 
                            sx={{marginTop:"20px"}} 
                            type="number"  />
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