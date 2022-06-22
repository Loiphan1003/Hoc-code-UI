import React from 'react';
import * as XLSX from 'xlsx';
import BaiTapCodeFile from '../../../files/BaiTapCode.xlsx';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
const Input = styled('input')({
    display: 'none',
});

function ImportBTCode({data,style}) {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFile = async (e) => {
        const file = e.target.files[0];
        const datafile = await file.arrayBuffer();
        const workBook = XLSX.read(datafile);

        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
            defval: ""
        });
        console.log(jsonData)
        data(jsonData.slice(1));
        setOpen(false);
    }


    return (

        <div>
            <Button sx={style} variant="outlined" onClick={handleClickOpen}>
                Import Bài tập code
            </Button>

            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title" sx={{fontWeight:'600'}}>
                {"Import bài tập code từ file excel"}
            </DialogTitle>
            <DialogContent  >
                <DialogContentText sx={{padding:'20px'}}>
                    <p>Để tạo nhiều câu hỏi vui lòng tạo theo file mẫu</p>
                    <FontAwesomeIcon icon={faFileCsv} style={{marginRight:'6px', color:'green', fontSize:'20px'}}></FontAwesomeIcon>
                    <a href={BaiTapCodeFile} download="BaiTapCode.xlsx" >Bấm vào đây để tải file</a>
                    <br></br>
                    <p style={{marginTop:'20px'}}>Để import câu hỏi vui lòng tải file Excel lên website!</p>
                    <label htmlFor="contained-button-file">
                        <Input accept="xlsx" id="contained-button-file" multiple type="file" onChange={(e) => handleFile(e)} />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </DialogContentText>
            </DialogContent>
            </Dialog>
        </div>
    );
}

export default ImportBTCode;