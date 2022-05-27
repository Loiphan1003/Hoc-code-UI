import React from 'react'
import classNames from 'classnames/bind'
import styles from './createMonHoc.module.css'

import TextField from '@mui/material/TextField';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
const cx = classNames.bind(styles);


function CreateMonHoc() {
  return (
    <div className={cx('content')}>
        <TextField sx={{marginTop:"50px"}} fullWidth label="Tên môn học" id="fullWidth" />
        <TextField sx={{marginTop:"50px"}} fullWidth label="Mô tả" id="fullWidth" />
        
        <div className={cx('input-file')}>
            <p>Hình ảnh cho môn học</p> 
            <input id="upload" type="file" accept="image/*"
            onChange={(event)=> { 
                this.readFile(event) 
            }}
            onClick={(event)=> { 
                event.target.value = null
            }}/>

        </div>

        <Button  variant="contained" style={{backgroundColor:"ButtonShadow"}}
            endIcon={<CancelIcon />}
            onClick={() => {
                console.log('Hủy')
            }}
        >
            Hủy
        </Button>

        <Button  variant="contained" style={{marginLeft:"20px"}}
            endIcon={<SaveIcon />}
        >
            Lưu
        </Button>
    </div>
  )
}

export default CreateMonHoc;
