import React from 'react';
import styles from './Member.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function Member(props) {

    const members = props.member;

    return (

        <>
            <div className={styles.header}>
                <div className={styles.header_find} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input placeholder='Tìm kiếm' />
                </div>
            </div>

            <div className={styles.member}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody >
                        {members.map(member => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Member;