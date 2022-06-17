import React, {useState, useEffect} from 'react';
import styles from './Member.module.css';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import PhongHocAPI from '../../../apis/phongHocApi';

function Member(props) {

    const colums = [
        { field: 'hoTen', headerName: 'Họ và tên', width: 200 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 200 },
        { field: 'email', headerName: 'Email', width: 230 }
    ]

    const [member, setMember] = useState([]);
    const params = useParams();

    const toolBarCustom = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport/>
                {/* <div onClick={() => handleImport()} >  
                    <p>Import thành viên</p>
                </div> */}
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        try {
            const getMember = async () => {
                const response = await PhongHocAPI.getMmeber(params.roomId);
                if(response.data.length > 0){
                    setMember(response.data);
                }
            }
            getMember();
        } catch (error) {
            console.log(error);
        }
    },[params.roomId])


    const handleImport = () => {
        console.log("runn")
    }



    return (

        <>
            <div className={styles.member}>

                <DataGrid
                    autoHeight
                    getRowId={(row) => row.email}
                    rows={member}
                    columns={colums}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{
                        Toolbar: toolBarCustom,
                    }}
                    checkboxSelection
                    localeText={{
                        toolbarColumns: "Cột",
                        toolbarFilters: "Tìm kiếm",
                        toolbarDensity: "Độ cao",
                        toolbarExport: "Xuất file",
                        // Value: "Giá trị",
                        filterPanelInputLabel: 'Giá trị',
                        filterPanelColumns: 'Cột',
                        filterPanelOperators: 'So sánh'
                    }}
                />

            </div>
        </>

    );
}

export default Member;