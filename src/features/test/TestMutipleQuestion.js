import React, { useState,useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import BaiTapTN from '../../apis/baiTapTN_API'
import { useDispatch ,useSelector} from 'react-redux';
import doTestSlice from '../../redux/doTestSlice'

import styles from './styles/TestMutipleQuestion.module.css';

function TestMutipleQuestion({data}) {

    const dispatch = useDispatch();
    const answer = useSelector((state) => state.doTest.answer.find(element => element.id === data.id&&element.loaiCauHoi=== data.loaiCauHoi))
    const [question, setQuestion] = useState({});

    useEffect(() =>{
        const getBTTN = async () =>{
            const response = await BaiTapTN.getOne(data.id);
            setQuestion(response.data);
        }
        getBTTN();
    },[data]);

    const handleChangeValue = (e) =>{
        dispatch(doTestSlice.actions.addAnswer({
            id:data.id,
            stt:data.stt,
            loaiCauHoi:0,
            cauHoi:question.cauHoi,
            dapAn:e.target.value,
            diemDatDuoc: question.dapAn === parseInt(e.target.value) ? data.diem : 0,
            diemToiDa: data.diem
        }))
    }

    return (
        <div className={styles.testMutiple} >
            <h2>Câu hỏi {data.stt}</h2>
            <h3>{question.cauHoi}</h3>

            <RadioGroup onChange={handleChangeValue} value={!!answer ? answer.dapAn:null} >
                <FormControlLabel value={1} label={question.cauTraLoi1} control={<Radio />} />
                <FormControlLabel value={2} label={question.cauTraLoi2} control={<Radio />} />
                <FormControlLabel value={3} label={question.cauTraLoi3} control={<Radio />} />
                <FormControlLabel value={4} label={question.cauTraLoi4} control={<Radio />} />
            </RadioGroup>
        </div>
    );
}

export default TestMutipleQuestion;