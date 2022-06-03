import React ,{memo, useEffect, useState} from 'react'
import styles from './ItemQuestion.module.css';
import classNames from 'classnames/bind'
import {  useDispatch } from 'react-redux';
import createTestSlice from '../../../redux/createTestSlice';
import BaiTapCodeAPI from '../../../apis/baiTapCodeAPI';
import BaiTapTN from '../../../apis/baiTapTN_API';
import { useStateIfMounted } from "use-state-if-mounted";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const cx = classNames.bind(styles);


function ItemQuestion({data,index}) {

    const dispatch = useDispatch();
    const [question,setQuestion] = useStateIfMounted({});
    
    const handleDeleteQuestion = (data) => {
        dispatch(createTestSlice.actions.deleteQuestion(data))
    }

    useEffect(() => {
        console.log("call API con")
        if(data.loaiCauHoi === 0)
        {
            const getOneTN = async()=>{
                try {
                    const response = await BaiTapTN.getOne(data.id);
                    setQuestion(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getOneTN();
        }
        else
        {
            const getOneCode = async()=>{
                try {
                    const response = await BaiTapCodeAPI.getOne(data.id);
                    setQuestion(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getOneCode();
        }
    }, [data]);


    return (
    <div className={cx('question')} >
        <div className={cx('header-ques')}>
            <div className={cx('header-ques-left')}>
                <h4 className={cx('number-ques')}>Câu {index+1}</h4>
                <span className={cx('scores')}>{data.diem} điểm</span>
                <span className={cx('type-ques')}>{data.loaiCauHoi === 0 ? 'TRẮC NGHIỆM':'CODE'}</span>
            </div>
            <div onClick={() => handleDeleteQuestion(data)}><DeleteForeverIcon fontSize='small' className={cx('icon-delete')} /></div>
        </div>

        <h3 className={cx('name-ques')}>{ data.loaiCauHoi === 0 ? question.cauHoi : question.deBai}</h3>
        <div className={cx('line')}></div>
        {
            data.loaiCauHoi === 0 ?
            <div>
                <h3 className={cx('ans-title')}>Câu trả lời</h3>
                <ul className={cx('ans-list')}>
                    <li>
                        <span style={{ fontWeight: "bold" }}>A:</span>
                        {question.cauTraLoi1}
                    </li>
                    <li>
                        <span style={{ fontWeight: "bold" }}>B:</span>
                        {question.cauTraLoi2}
                    </li>
                    <li>
                        <span style={{ fontWeight: "bold" }}>C:</span>
                        {question.cauTraLoi3}
                    </li>
                    <li>
                        <span style={{ fontWeight: "bold" }}>D:</span>
                        {question.cauTraLoi4}
                    </li>
                </ul>
            </div>
        :   <div>
                <h3 className={cx('ans-title')}>Ví dụ mẫu</h3>
                <div className={cx('sample-code')}>
                    <p>Input</p>
                    <div>{question.mauDauVao}</div>
                    <p>Output</p>
                    <div>{question.mauDauRa}</div>
                </div>
            </div>
        }
    </div>
  )
}

export default memo(ItemQuestion);