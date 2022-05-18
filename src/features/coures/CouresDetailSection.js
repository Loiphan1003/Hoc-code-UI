import React from 'react';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

import LyThuyetAPI from '../../apis/lyThuyetAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from './styles/CouresSection.module.css';

function CouresDetailSection(props) {

    let params = useParams()
    const [lyThuyet,setLyThuyet] = useState({});
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const getOneLyThuyet = async () =>{
                    try {
                        console.log()
                        const response = await LyThuyetAPI.getOne(params.idLyThuyet);
                        setLyThuyet(response.data);
                    } catch (error) {
                        console.log("Fetch data false ", error);
                    }
                }
                getOneLyThuyet();
            }
        });
    },[params.idLyThuyet])

    return (
        <div>
            <div className={styles.header}>
                <h1>{lyThuyet.tieuDe}</h1>
            </div>

            <div className={styles.content} dangerouslySetInnerHTML={{__html: lyThuyet.noiDung}}>
                {/* conten */}
            </div>
        </div>
    );
}

export default CouresDetailSection;