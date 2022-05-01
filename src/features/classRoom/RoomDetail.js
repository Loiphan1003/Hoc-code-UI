import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ImageBackground from '../../images/room_background.png';
import Coursework from './Coursework';
import Member from './Member';
import styles from './RoomDetail.module.css'
// import { async } from '@firebase/util';
import CourseApi from '../../apis/courseApi';
import RoomApi from '../../apis/roomApi';

function RoomDetail(props) {

    const [tabType, setTabType] = useState("Bài tập");
    const [member, setMember] = useState([]);
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
                        const responseCoursework = await RoomApi.getCoursework();
                        setMember(responseCoursework.data)
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

    // console.log(member);

    let params = useParams();

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <FontAwesomeIcon icon={faChevronLeft} size='2x' />
                    <h1>{params.roomName}</h1>
                </div>

                <div className={styles.header_right} >
                    <FontAwesomeIcon icon={faCirclePlus} size='2x' />
                    <p>Thêm thành viên</p>
                </div>
            </div>

            <div className={styles.container}>
                <img src={ImageBackground} alt="background" />
                <div className={styles.content}>
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
                    {tabType === "Bài tập" && <Coursework type={tabType} /> } 
                    {tabType === "Thành viên" && <Member type={tabType} member={member} /> } 
                </div>
            </div>
        </>
    );
}

export default RoomDetail;