import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styles from './styles/couresDetail.module.css';
import LyThuyetAPI from '../../apis/lyThuyetAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function CouresDetail(props) {

    const [coures, setCoures] = useState([]);
    const [nameTheory,setNameTheory] = useState('');
    let params = useParams()
    const uId = JSON.parse(localStorage.getItem('uId')); 
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!!uId) {
            const getTheoryLection = async () =>{
                try {
                    const response = await LyThuyetAPI.getAll(params.courseID);
                    setNameTheory(response.data.tenMonHoc)
                    setCoures(response.data.lyThuyets);
                } catch (error) {
                    console.log("Fetch data false ", error);
                }
            }
            getTheoryLection();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.courseID])


    return (
        <>
            <div className={styles.couresDetail}>
                <div className={styles.couresDetailTitle}>
                    <div className={styles.heading}>
                        <h1>{nameTheory}</h1>
                        <p>Hiểu sâu hơn về cách hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ...</p>
                    </div>
                    <div className={styles.what_learn}>
                        <h2>Bạn sẽ học được những gì?</h2>
                        <ul className={styles.list_whatLearn}>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Hiểu được cách tư duy nâng cao của các lập trình viên có kinh nghiệm
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Có nền tảng vững chắc để làm việc với mọi thư viện, framework
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Các kiến thức nâng cao giúp code trở nên tối ưu hơn
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Hiểu được các khái niệm khó về từ khóa, phương thức xử lý bất đồng bộ
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck}/>
                                Nâng cao cơ hội thành công khi phỏng vấn xin việc nhờ kiến thức chuyên môn vững chắc
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.couresDetailList}>
                        {coures.map(coure => (
                            <NavLink  to={`/couredetail/section/${coure.id}`} key={coure.id} className={styles.coure} >
                                <LibraryBooksIcon/>
                                {coure.tieuDe}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CouresDetail;