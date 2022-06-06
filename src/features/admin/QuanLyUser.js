import React from 'react'
import {useEffect, useState} from 'react'
import NguoiDungAPI from '../../apis/nguoiDungAPI';
import styles from './QuanLyUser.module.css'


function QuanLyUser() {
    
    const [user, setUser] = useState([]); 
    useEffect(() =>{
        const data = async () => {
            try {
                const response = await NguoiDungAPI.getAll();
                setUser(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
    },[])
    
    return (
    <div className={styles.srolls}>
        <table className={styles.custom_table}>
            <thead>
                <tr>
                    <th>
                        STT
                    </th>
                    <th>
                        Mã người dùng
                    </th>
                    <th>
                        Họ và tên
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Ngày sinh
                    </th>
                    <th>
                        Học tại
                    </th>
                    <th></th>
                </tr>
            </thead>
            {user.map((item, index) => {
                return (
                    <tbody key={item.uId} >
                        <tr>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                {item.uId}
                            </td>
                            <td>
                                {item.hoTen}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.namSinh}
                            </td>
                            <td>
                                {item.truong}
                            </td>
                            
                        </tr>
                    </tbody>
                );
            })}
        </table>
    </div>
  )
}

export default QuanLyUser