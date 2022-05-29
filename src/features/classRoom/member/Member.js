import React from 'react';
import styles from './Member.module.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


function Member(props) {

    const colums = [
        { field: 'id', headerName: 'uID', width: 150 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 200 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 200 },
        { field: 'Email', headerName: 'Email', width: 130 }
    ]

    const rows = [
        { id: 1, hoTen: 'Snow', tenHienThi: 'Jon', Email: 'nvduy.k19' },

    ];


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
                        Toolbar: GridToolbar
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