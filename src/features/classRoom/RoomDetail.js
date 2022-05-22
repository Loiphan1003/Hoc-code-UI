import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Coursework from './coursework/Coursework';
import Member from './member/Member';
import styles from './RoomDetail.module.css'
import CourseApi from '../../apis/courseApi';

function RoomDetail(props) {

    const [tabType, setTabType] = useState("Bài tập");
    const [roomInfo, setRoomInfo] = useState();
    const [member, setMember] = useState([]);
    // let params = useParams();
    // let RoomInfo = []

    const tabs = [
        {
            path: "/practice",
            name: "Bài tập",
        },
        {
            path: "user",
            name: "Thành viên",
        },
    ]

    const handleTab = (value) => {
        setTabType(value.name)

    }

   

    useEffect(() => {
        const functions = async () => {
            try {

                switch (tabType) {
                    case "Thành viên":
                        const responseMember = await CourseApi.getAll();
                        setMember(responseMember.data);
                        break;
                    case "Bài tập":
                        break;
                    default:
                        console.log("Unkown");
                        break;
                }

                return;
            } catch (error) {
                console.log("Fetch data false ", error);
            }
        }
        functions();
    }, [tabType])




    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <FontAwesomeIcon icon={faChevronLeft} size='2x' />
                    <h1>{roomInfo === undefined ? '': roomInfo.name}</h1>
                </div>

            </div>

            <div className={styles.container}>
                {/* <img src={ImageBackground} alt="background" /> */}
                <div className={styles.content}>

                    <div className={styles.roomdetail_id} >
                        <p>Mã Lớp</p>
                        <p>{roomInfo === undefined ? '': roomInfo.id}</p>
                    </div>

                    <div className={styles.roomdetail_header}>

                        {tabs.map((tab) => (

                            <button key={tab.name}
                                onClick={() => handleTab(tab)}
                                style={tabType === tab.name ? {
                                    color: 'white',
                                    backgroundColor: '#3F48CC'
                                } : {

                                }}
                            >
                                {tab.name}
                            </button>
                        ))}

                    </div>
                    {tabType === "Bài tập" && <Coursework type={tabType} />}
                    {tabType === "Thành viên" && <Member type={tabType} member={member} />}
                </div>
            </div>
        </>
    );
}

export default RoomDetail;