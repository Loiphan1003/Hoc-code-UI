import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import Backdrop from '../.././../components/Backdrop';
import { faChevronRight, faCirclePlus, faMagnifyingGlass, faTableList, faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from "./CourseWork.module.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import DeKiemTraAPI from '../../../apis/deKiemTraAPI';
import { useStateIfMounted } from "use-state-if-mounted";


function Coursework(props) {

    const params = useParams();
    const navigate = useNavigate();
    const idPhong = params.roomId;
    const [draft, setDarft] = useState(false);
    const [open, setOpen] = useState(true);
    const [close, setClose] = useState(true);
    const [test,setTest] = useStateIfMounted({
        testDraft:[],
        testOpen:[],
        testClose:[]
    });
    const [mobileOpen, setMobileOpen] = useState();
    const isTeacher = JSON.parse(localStorage.getItem('isTeacher')); 
    const [openDialogPublic, setOpenDialogPublic] = React.useState(false);
    const [testSelect,setTestSelect] = useState({});

    const handleClickOpen = (test) => {
        setOpenDialogPublic(true);
        setTestSelect(test);
    };

    const handleClose = () => {
        setOpenDialogPublic(false);
    };

    const getListDeKiemTra = async ()=>{
        try {
            const response = await DeKiemTraAPI.getByIDPhonng(idPhong);
            setTest({
                testDraft:response.data.filter(item => item.trangThai ===0),
                testOpen:response.data.filter(item => item.trangThai ===1),
                testClose:response.data.filter(item => item.trangThai ===2)
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getListDeKiemTra();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [filter, setFilter] = useState({
        draft: false,
        open: false,
        close: false,
        code: false,
        mutiple_question: false,
    });
    const handleFilterChange = (event) => {
        setFilter({
            // copy filter
            ...filter,
            // thay đổi giá trị
            [event.target.name]: event.target.checked,
        })

    }

    const handleAccept = (id) => {
        const publicBaiKiemTra = async () => {
            try {
                const response = await DeKiemTraAPI.publicDeKiemTra(id);
                if(response.data)
                {
                    getListDeKiemTra();
                    setOpenDialogPublic(false);
                }
            } catch (error) {
                console.log(5)
            }
        }
        publicBaiKiemTra();
    }

    const handleExerciseClose = (id) => {
        console.log(id);
        if( isTeacher === true ){
            navigate(`/test-overview/${id}`)
        }
        if(isTeacher === false){
            alert("Bài tập đã kết thúc")
        }
    }

    return (
        <div className={props.type === 'Bài tập' ? styles.courseWork : styles.none} >
            {/*Start Mobile  */}
            <div className={styles.mobile_btn} >
               
                <NavLink to={`/room/${idPhong.roomId}/create`} className={styles.btn_mobile} >
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span>Tạo bài tập</span>
                </NavLink>

                <div className={styles.btn_mobile} onClick={() => setMobileOpen("find")} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>Tìm kiếm</span>
                </div>

                <div className={styles.btn_mobile} onClick={() => setMobileOpen("filter")} >
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Lọc</span>
                </div>
            </div>

            {mobileOpen === "find" && <div className={styles.frame}  >
                <Backdrop className={styles.backdrop} onClick={() => setMobileOpen('')}
                />
                <div className={styles.mobile_find_content} >
                    <input type="text" placeholder='Nhập tên bài cần tìm' />
                </div>
            </div>}

            {mobileOpen === "filter" && <div className={styles.frame} >
                <Backdrop onClick={() => setMobileOpen('')} open={true} />
                <div className={styles.mobile_filter_content} >

                    <FormControl component="fieldset" >
                        <FormLabel>Lọc theo trạng thái:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={handleFilterChange} name="draft" />
                                }
                                label="Nháp"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="open" />
                                }
                                label="Mở"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="close" />
                                }
                                label="Đóng"
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" >
                        <FormLabel>Lọc theo loại:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox name="code" />
                                }
                                label="Code"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox name="mutiple_question" />
                                }
                                label="Trắc nghiệm"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>}

            {/*End:  Mobile */}
            <div className={styles.courseWork_left_content}>
                {
                    isTeacher &&
                    (
                    <>
                        <div className={styles.courseWork_item} onClick={() => setDarft(!draft)}>
                        <div className={styles.courseWork_item_content}>
                            <p>Nháp</p>
                            <FontAwesomeIcon className={draft ? styles.icon_active : styles.icon} icon={faChevronRight}/>
                            <span>{test.testDraft.length}</span>
                        </div>
                        </div>
                        {draft && <div className={styles.coursework_content} >
                            {
                                test.testDraft.map((test,index) => (
                                    <div className={styles.coursework_content_item} key={index}>
                                        <div className={styles.item_info}>
                                            <FontAwesomeIcon icon={faTableList} />
                                            <div className={styles.item_name} onClick={() => handleClickOpen(test)}>{test.moTa}</div>
                                        </div>
                                        <p className={styles.item_draft}>Nháp</p>
                                    </div>
                                ))
                            }</div>
                        }
                    </>
                    )
                }
                <div className={styles.courseWork_item} onClick={() => setOpen(!open)} >
                    <div className={styles.courseWork_item_content}>
                        <p>Mở</p>
                        <FontAwesomeIcon className={open ? styles.icon_active : styles.icon} icon={faChevronRight} />
                        <span>{test.testOpen.length}</span>
                    </div>
                </div>
                {open && <div className={styles.coursework_content} >
                    {
                        test.testOpen.map((test,index) => (
                            <div className={styles.coursework_content_item} key={index}>
                                <div className={styles.item_info}>
                                    <FontAwesomeIcon icon={faTableList} />
                                    <NavLink className={styles.item_name} to={isTeacher ? `/test-overview/${test.id}`:`/test/${test.id}`} >{test.moTa}</NavLink>
                                    <p className={styles.item_time}>Bắt đầu lúc {test.ngayBatDau} kết thúc lúc {test.ngayKetThuc}</p>
                                </div>
                                <p className={styles.item_open}>Mở</p>
                            </div>
                        ))
                    }
                </div>}

                <div className={styles.courseWork_item} onClick={() => setClose(!close)}>
                    <div className={styles.courseWork_item_content}>
                        <p>Kết thúc</p>
                        <FontAwesomeIcon className={close ? styles.icon_active : styles.icon} icon={faChevronRight}  />
                        <span>{test.testClose.length}</span>
                    </div>
                </div>
                {close && <div className={styles.coursework_content} >
                    {
                        test.testClose.map((test,index) => (
                            <div className={styles.coursework_content_item_close} key={index}>
                                <div className={styles.item_info}>
                                    <FontAwesomeIcon icon={faTableList} />
                                    <p className={styles.item_name_close}  onClick={() => handleExerciseClose(test.id)} >{test.moTa}</p>
                                    <p className={styles.item_time}>Đã kết thúc vào lúc {test.ngayKetThuc}</p>
                                </div>
                                <p className={styles.item_close}>Kết thúc</p>
                            </div>
                        ))
                    }
                    
                </div>}
            </div>

            <div className={styles.courseWork_right_content}>
                
                {localStorage.getItem("isTeacher") === 'true' && 
                <NavLink to={`/create-test/${idPhong}`} className={styles.btn_}>
                    <FontAwesomeIcon icon={faCirclePlus} fontSize='22px' />
                    <p>Tạo bài tập</p>
                </NavLink>}

                <div className={styles.btn_fillter}>
                    <p>Trạng thái</p>

                    {isTeacher === true &&
                    <div className={styles.status}>
                        <input id='Draft' type="checkbox" value="Nháp" />
                        <label id={styles.draft} htmlFor="Draft">Nháp</label>
                    </div>}

                    <div className={styles.status}>
                        <input id='Open' type="checkbox" value="Nháp" />
                        <label id={styles.open} htmlFor="Open">Mở</label>
                    </div>

                    <div className={styles.status} >
                        <input id='Close' type="checkbox" value="Nháp" />
                        <label id={styles.close} htmlFor="Close">Kết thúc</label>
                    </div>
                </div>
            </div>
            <Dialog
                open={openDialogPublic}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Bạn có muốn công khai bài kiểm tra này?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   {testSelect.moTa}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={() => handleAccept(testSelect.id)} autoFocus>
                    Đồng ý
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Coursework;