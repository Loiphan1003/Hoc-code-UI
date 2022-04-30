import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ImageBackground from '../../images/room_background.png';
import Draft from './Draft';
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
    useEffect( () => {
        const functions = async ()=>{
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

    console.log(member);

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
                    <div className={styles.left_content}>
                        {/* <div className={styles.left_content_header}>
                            <NavLink className={(navdata) => (navdata.isActive ? styles.navItem_active : styles.navItem)} to={`/room/${params.roomName}`} >Bài tập</NavLink>
                            <NavLink className={(navdata) => (navdata.isActive ? styles.navItem_active : styles.navItem)} to={`/room/${params.roomName}`} >Thành viên</NavLink>

                        </div> */}
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
                        <Draft />
                    </div>
                    <div className={styles.right_content}>

                        <div className={styles.btn_}>
                            <FontAwesomeIcon icon={faCirclePlus} size="2x" />
                            <p>Tạo bài tập</p>
                        </div>

                        <div className={styles.btn_} id={styles.find}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                            <input placeholder='Tìm kiếm bài tập' />
                        </div>

                        <div className={styles.btn_fillter}>
                            <div className={styles.fillter_}>
                                <p>Tìm kiếm theo trạng thái:</p>

                                <div className={styles.status}>
                                    <input name='Draft' type="checkbox" value="Nháp" />
                                    <label id={styles.draft} htmlFor="Draft">Nháp</label>
                                </div>

                                <div className={styles.status}>
                                    <input name='Open' type="checkbox" value="Nháp" />
                                    <label id={styles.open} htmlFor="Open">Mở</label>
                                </div>

                                <div className={styles.status} >
                                    <input name='Close' type="checkbox" value="Nháp" />
                                    <label id={styles.close} htmlFor="Close">Đóng</label>
                                </div>
                            </div>
                            <div className={styles.fillter_type}>
                                <p>Tìm kiếm theo loại bài tập:</p>

                                <div className={styles.type}>
                                    <input name='Draft' type="checkbox" value="Nháp" />
                                    <label htmlFor="Draft">Trắc nghiệm</label>
                                </div>

                                <div className={styles.type}>
                                    <input name='code' type="checkbox" value="code" />
                                    <label htmlFor="code">Viết code</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetail;