import React from 'react';
import styles from './Member.module.css';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';

function Member(props) {

    const colums = [
        { field: 'id', headerName: 'uID', width: 150 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 200 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 200 },
        { field: 'Email', headerName: 'Email', width: 130 }
    ]

    

    const toolBarCustom = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport/>
                <div onClick={() => handleImport()} >  
                    <p>Import thành viên</p>
                </div>
            </GridToolbarContainer>
        )
    }

    const rows = [
        { id: 1, hoTen: 'Snow', tenHienThi: 'Jon', Email: 'nvduy.k19' },

    ];

    const handleImport = () => {
        console.log("runn")
    }



    return (

        <>
            <div className={styles.member}>

                <DataGrid
                    autoHeight
                    rows={rows}
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