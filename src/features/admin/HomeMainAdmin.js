import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faCode, faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import styles from './HomeMainAdmin.module.css'
import LyThuyetAPI from '../../apis/lyThuyetAPI';
import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI';
import NguoiDungAPI from '../../apis/nguoiDungAPI';

function HomeMainAdmin() {

  const [countLyThuyet, setCountLyThuyet] = useState(0);
  const [countBaiLuyenTap, setCountBaiLuyenTap] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {

    if (sessionStorage.getItem('Admin') === 'true') {
      const data = async () => {
        try {
          const responseLythuyet = await LyThuyetAPI.countAll();
          setCountLyThuyet(responseLythuyet.data);
          const responseNguoiDung = await NguoiDungAPI.getSoLuongUser();
          setCountUser(responseNguoiDung.data);
          const responseBaiLuyenTap = await BaiTapLuyenTapAPI.count()
          setCountBaiLuyenTap(responseBaiLuyenTap.data);
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      }
      data();
      return;
    }
    else{
      navigate('/admin');
    }
  }, [navigate])

  const thongke = [
    {
      icon: faBook,
      name: "Số bài lý thuyết",
      solieu: countLyThuyet,
      bg: "rgb(6, 159, 103)"
    },
    {
      icon: faCode,
      name: "Số bài code",
      solieu: countBaiLuyenTap,
      bg: "#FF8C00"
    },
    {
      icon: faUser,
      name: "Số user",
      solieu: countUser,
      bg: "#0059ff"
    },
    {
      icon: faPen,
      name: "Số bài trắc nghiệm",
      solieu: countLyThuyet,
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
            <div className={styles.thongkelythuyet} key={index} style={{ backgroundColor: item.bg }}>
              {/* <div className={styles.thongkelythuyetDetail}> */}
                <FontAwesomeIcon icon={item.icon} />

                {/* <div className={styles.icon_thongkelythuyetDetail}>
                  {item.icon}
                </div> */}
                <div className={styles.solieu_thongkelythuyetDetail}>
                  <span>{item.name}</span>
                  <br></br>
                  <span className={styles.solieu_lythuyet_tongbai}>{item.solieu}</span>
                </div>
              {/* </div> */}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default HomeMainAdmin