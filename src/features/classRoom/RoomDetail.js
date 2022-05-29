import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBook } from '@fortawesome/free-solid-svg-icons';
import Coursework from './coursework/Coursework';
import Member from './member/Member';
import styles from './RoomDetail.module.css'
import PhongHocAPI from '../../apis/phongHocApi';

function RoomDetail(props) {
    const tabs = ["Bài tập","Thành viên"]

    const [tabType, setTabType] = useState("Bài tập");
    const [roomInfo, setRoomInfo] = useState({});
    let params = useParams();

    useEffect(() => {
        const getInforRoom = async()=>{
            try {
                const response = await PhongHocAPI.getOneByID(params.roomId);
                setRoomInfo(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getInforRoom();
    }, [params]);


    const handleTab = (value) => {
        setTabType(value)
    }


    return (
        <>
            <div className={styles.header}>
                <div className={styles.nameRoom}>
                    <FontAwesomeIcon className={styles.iconHeader} icon={faBook} />
                    <h1>{roomInfo.tenPhong}</h1>
                </div>
                <h2>{roomInfo.id}</h2>
            </div>

            <div className={styles.container}>
               
                <div className={styles.content}>

                    <div className={styles.roomdetail_header}>

                        {tabs.map((tab) => (

                            <button key={tab}
                                onClick={() => handleTab(tab)}
                                style={tabType === tab ? {
                                    color: 'white',
                                    backgroundColor: '#3e80ef'
                                } : {

                                }}
                            >
                                {tab}
                            </button>
                        ))}

                    </div>
                    {tabType === "Bài tập" && <Coursework type={tabType} />}
                    {tabType === "Thành viên" && <Member type={tabType} />}
                </div>
            </div>
        </>
    );
}

export default RoomDetail;