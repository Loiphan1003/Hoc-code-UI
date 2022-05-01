import React from 'react';
import styles from './RoomDetail.module.css';


function Member(props) {

    const members = props.member;

    return (
        <div className={props.type === "Thành viên" ? styles.member : styles.none}>
            <table>
                <thead className={styles.memberHeader}>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody className={styles.memberHeader}>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Member;