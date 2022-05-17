import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';


import styles from './styles/TestMutipleQuestion.module.css';

function TestMutipleQuestion({data}) {

    const [answer, setAnswer] = useState();


    return (
        <div className={styles.testMutiple} >
            <h2>Câu hỏi {data.index}</h2>
            <h3>Đề câu hỏi</h3>

            <RadioGroup onChange={(e) => setAnswer(e.target.value)} >
                <FormControlLabel value="Đáp án 1" label="Đáp án 1" control={<Radio />} />
                <FormControlLabel value="Đáp án 2" label="Đáp án 2" control={<Radio />} />
                <FormControlLabel value="Đáp án 3" label="Đáp án 3" control={<Radio />} />
                <FormControlLabel value="Đáp án 4" label="Đáp án 4" control={<Radio />} />
            </RadioGroup>
        </div>
    );
}

export default TestMutipleQuestion;