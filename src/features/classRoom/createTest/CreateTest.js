import React, { useState } from 'react';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
function CreateTest(props) {

    const [questions,setQuestions] = useState([]);
    const [typeQuestion,setTypeQuestion] = useState();
    // const [question, setQuestion] = useState();
    const [openButtonAdd, setOpenButtonAdd] = useState(false);
    const [openBackDrop, setopenBackDrop] = useState(false);

    const handleCloseBdrop = () => {
        setopenBackDrop(false);
    };

    const handleClickItemAdd = (loaiBai) => {
        console.log(loaiBai)
        setTypeQuestion(loaiBai)
        setOpenButtonAdd(p => !p)
        setopenBackDrop(p => !p)
    }

    const handleAccept = () => {
        setQuestions([...questions,{type:typeQuestion}])
        setopenBackDrop(false);
    }

    const handleDeleteQuestion = (index) => {
        console.log(index)
        setQuestions(pre => [...pre.slice(0, index), ...pre.slice(index + 1)])
    }
    return (
        <>
            <div className={cx('header')}>
                <h2 >Tên bài tập ...</h2>
                <Button variant="contained">
                    Lưu bài
                </Button>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-center')}>
                    <input className={cx('input-nameTest')}
                        type='text' placeholder='Nhập tên bài kiểm tra'
                    >
                    </input>
                    <div className={cx('content-describe')}>
                        <h3 className={cx('title-row')}>Ngày bắt đầu & Ngày kết thúc</h3>
                        <RangePicker
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={(dates, dateStrings) => {
                                console.log(dates)
                                console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
                            }}
                        />
                    </div>

                    <div className={cx('content-questions')}>
                        <h3 className={cx('title-row')}>Các câu hỏi trong bài kiểm tra</h3>
                        {
                            questions.map( (item,index) => (
                                    <div className={cx('question')} key={index}>
                                        <div className={cx('header-ques')}>
                                            <div className={cx('header-ques-left')}>
                                                <h4 className={cx('number-ques')}>Câu {index+1}</h4>
                                                <span className={cx('scores')}>{'(2 điểm)'}</span>
                                                <span className={cx('type-ques')}>{item.type === 1 ? 'TRẮC NGHIỆM':'CODE'}</span>
                                            </div>
                                            <div onClick={() => handleDeleteQuestion(index)}><DeleteForeverIcon fontSize='small' className={cx('icon-delete')} /></div>
                                        </div>

                                        <h3 className={cx('name-ques')}>Một trong những đáp án sau đáp án nào đúng?</h3>
                                        <div className={cx('line')}></div>
                                        {
                                            item.type === 1 ?
                                            <div>
                                                <h3 className={cx('ans-title')}>Câu trả lời</h3>
                                                <ul className={cx('ans-list')}>
                                                    <li>
                                                        <span style={{ fontWeight: "bold" }}>A:</span>
                                                        Nguyễn Văn Duy
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: "bold" }}>B:</span>
                                                        Nguyễn Văn A
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: "bold" }}>C:</span>
                                                        Nguyễn Văn C
                                                    </li>
                                                    <li>
                                                        <span style={{ fontWeight: "bold" }}>D:</span>
                                                        Pham Van D
                                                    </li>
                                                </ul>
                                            </div>
                                        :   <div>
                                                <h3 className={cx('ans-title')}>Ví dụ mẫu</h3>
                                                <div className={cx('sample-code')}>
                                                    <p>Input</p>
                                                    <div>{'5\n1 2 3 4 5'}</div>
                                                    <p>Output</p>
                                                    <div>{'5\n1 2 3 4 5'}</div>
                                                </div>
                                            </div>
                                        }
                                    </div>
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
                                    <div className={cx('item-btn-add')} onClick={() => handleClickItemAdd(0)}>
                                        <CodeIcon fontSize='5px' />
                                        <p>Bài tập code</p>
                                    </div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('item-btn-add')} onClick={() => handleClickItemAdd(1)}>
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
                                    openButtonAdd ? <ArrowDropUpIcon sx={{ fontSize: "19px" }} />
                                        : <ArrowDropDownIcon sx={{ fontSize: "19px" }} />
                                }
                            </button>
                        </HeadlessTippy>
                    </div>


                </div>
                
                <Dialog open={openBackDrop} onClose={handleCloseBdrop} >
                    <DialogTitle>Thêm bài tập</DialogTitle>
                    <DialogContent style={{height:"180px",width:"500px"}}>
                        <DialogContentText>
                            Nhập ID hoặc câu hỏi bài tập bạn muốn tìm kiếm.
                        </DialogContentText>
                        <HeadlessTippy
                            visible={false}
                            interactive
                            render={() => (
                                <div className={cx('search-result')}>
                                    <div className={cx('item-search-res')}>
                                        <AutoStoriesIcon fontSize=''/>
                                        <span style={{fontWeight:"bold", marginLeft:"3px"}}>ID:</span>
                                        <span>1</span>
                                        <span className={cx('item-res-nameAns')}>
                                            Phân loại các biến sau?
                                        </span>
                                    </div>
                                    <div className={cx('item-search-res')}>
                                        <AutoStoriesIcon fontSize=''/>
                                        <span style={{fontWeight:"bold", marginLeft:"3px"}}>ID:</span>
                                        <span>2</span>
                                        <span className={cx('item-res-nameAns')}>
                                            Phân loại các biến sau?
                                        </span>
                                    </div>
                                    
                                </div>
                            )}
                            placement={'bottom-start'}
                            // onClickOutside={() => setVisible(p => !p)}
                        >
                            <TextField
                                autoFocus
                                margin="dense"
                                label="ID hoặc Câu hỏi"
                                type="text"
                                fullWidth
                                variant="standard"/>
                        </HeadlessTippy>
                        <TextField variant="standard" fullWidth label="Nhập điểm" sx={{marginTop:"20px"}}  />
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