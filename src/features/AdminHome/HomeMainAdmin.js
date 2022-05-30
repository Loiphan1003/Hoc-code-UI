import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faCode, faUser, faPen} from '@fortawesome/free-solid-svg-icons';
import styles from './HomeMainAdmin.module.css'
import LyThuyetAPI from '../../apis/lyThuyetAPI';
import NguoiDungAPI from '../../apis/nguoiDungAPI';

function HomeMainAdmin() {

  const [count, setCount] = useState(0);
  const [countUser, setCountUser] = useState(0);
  
  useEffect(() =>{
    const data = async () => {
      try {
          const response = await LyThuyetAPI.countAll();
          setCount(response.data);
      } catch (error) {
          console.log("Fetch data error: ", error);
      }
    }
    data();
  },[])

  useEffect(() =>{
    const data = async () => {
      try {
          const response = await NguoiDungAPI.getSoLuongUser();
          setCountUser(response.data);
      } catch (error) {
          console.log("Fetch data error: ", error);
      }
    }
    data();
  },[])

  const thongke = [
    {
      icon: <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>,
      name: "Số bài lý thuyết",
      solieu: count,
      bg: "rgb(6, 159, 103)"  
    },
    {
      icon: <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>,
      name: "Số bài code",
      solieu: count,
      bg: "#FF8C00"  
    },
    {
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      name: "Số user",
      solieu: countUser,
      bg: "#0059ff"  
    },
    {
      icon: <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>,
      name: "Số bài trắc nghiệm",
      solieu: count,
      bg: "#FF1818"  
    },
  ]

  return (
    <div className={styles.scrolls}>
      <div className={styles.head}>
        <div className={styles.header_icon}>
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <span className={styles.header_icon_left}>Dashboard</span>
        </div>
      </div>
      <div className={styles.gachngang}></div>
      <div className={styles.thongke}>
        {/* map mảng thống kê */}
        {thongke.map((item, index) => {
          return (
            <div className={styles.thongkelythuyet} key={index} style={{backgroundColor: item.bg}}>
              <div className={styles.thongkelythuyetDetail}>
                <div className={styles.icon_thongkelythuyetDetail}>
                  {item.icon}
                </div>
                <div className={styles.solieu_thongkelythuyetDetail}>
                  <span>{item.name}</span>
                  <br></br>
                  <span className={styles.solieu_lythuyet_tongbai}>{item.solieu}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default HomeMainAdmin