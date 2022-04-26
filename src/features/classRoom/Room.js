import React, {useState , useEffect} from 'react';


import CourseApi from '../../apis/courseApi';
import styles from './ClassRoom.module.css';
import DevImage from '../../images/userImageDev.png';


function Room(props) {

    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        const data = async ()=>{
            try {
                const response = await CourseApi.getAll();
                setRooms(response.data);
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
        data();
        // return () => data();
    },[])

    // console.log(rooms);


    return (
        <>
            {rooms.map(room =>(
                <div key={room.id} className={styles.room}>
                <div className={styles.roomheader}>
                    <h1 className={styles.roomName}>{room.name}</h1>
                </div>
                <div className={styles.owner}>
                    <img src={DevImage} className={styles.ownerImage} alt='OwnerImage'></img>
                    <p className={styles.ownerName}>nvduy_0511</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.numberStudent}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABfElEQVQ4jdXUv0tXURjH8VdfKxpMqKGCCsmsCMEtiMCEmqspgqZ+QWMN/Q1RTSEE1qA0FkhzY5PiN1DDpKU5rFyMdClrOM+Nw+F75K594PLc+7nneZ9fzzn8jzqKaXzDL3zEfdzDcnirmMKRMnlH8X0a7/ATL/AFZ3AHuzGJ2ej0LvbgPD7VRjePLvoL/yw2AtxoAAuYq8FG8Sd67KUJacq5LkbOSGN0sp/DEd9XgMs4UXjdiP/8HLgW8XAFuC9r06hpW/pIi74qbUapvfgsTTvXlLRxuyqDcA1beI6h6GQMi9JaXQ9vKGBbuFqDwW1sRnKbZxO3arBHUtE+xkGcwxWpNk/hbUCexagP4UnkPCxhl/EbN7YZfR9e4au0po1uRu6lvHEXM9vAGg1IR/JB4b+RFfixmMp4CyA8xVLhXQjGYAfHwyxPQU0LOFl4HyIOd6SCpVKcPbQhXQq5vkfcvzMzX7cENldWz/Z9+IED8d5G61jp4S/iZUtGe/0FBLNWVutsyNkAAAAASUVORK5CYII=" alt='NumberStudentIcon'/>
                    <p>00</p>
                </div>
            </div>
            ))}
            

        </>

    );
}

export default Room;