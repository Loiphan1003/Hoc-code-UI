import React from 'react'
import classNames from 'classnames/bind'
import styles from './createLyThuyet.module.css'

import TextField from '@mui/material/TextField';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const cx = classNames.bind(styles);



function CreateLyThuyet() {
  return (
    <div className={cx('content')}>
        <TextField sx={{marginTop:"50px"}} fullWidth label="Tiêu đề" id="fullWidth" />
        <div className={cx('noiDung')}>
            <p>Nội dung</p>
            <CKEditor
                editor={ ClassicEditor }
                height="700px"
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ (editor) => {
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "height",
                            "400px",
                            editor.editing.view.document.getRoot()
                        );
                    });
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>

        <div>
            
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

export default CreateLyThuyet;
