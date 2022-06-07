import React from 'react';
import styles from './style.module.css';
import * as XLSX from 'xlsx';
import BaiTapCodeFile from '../../../files/BaiTapCode.xlsx';

function ImportBTCode({data}) {

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const datafile = await file.arrayBuffer();
        const workBook = XLSX.read(datafile);

        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
            defval: ""
        });
        data(jsonData.slice(1));
    }


    return (
        <div className={styles.container}>
            <p>Để tạo nhiều câu hỏi vui lòng tạo theo file mẫu</p>
            <a href={BaiTapCodeFile} download="BaiTapCode.xlsx" >Bấm vào đây để tải file</a>

            <input type="file" accept='xlsx' onChange={(e) => handleFile(e)} />
        </div>
    );
}

export default ImportBTCode;