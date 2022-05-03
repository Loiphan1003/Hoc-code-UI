import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCirclePlus, faMagnifyingGlass, faTableList } from '@fortawesome/free-solid-svg-icons';

import styles from "./CourseWork.module.css"
import { NavLink } from 'react-router-dom';


function Draft(props) {

    const [draft, setDarft] = useState(false);
    const [open, setOpen] = useState(true);
    const [close, setClose] = useState(true);

    return (
        <div className={props.type === 'Bài tập' ? styles.courseWork : styles.none} >
            <div className={styles.courseWork_left_content}>
                <div className={styles.courseWork_draft}>
                    <div className={styles.header}>
                        <p>Nháp</p>
                        <FontAwesomeIcon className={draft ? styles.icon_active : styles.icon} icon={faChevronRight} onClick={() => setDarft(!draft)} />
                    </div>

                </div>
                {draft && <div className={styles.coursework_content} >
                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                        </div>

                        <p className={styles.item_draft}>Nháp</p>
                    </div>
                </div>}

                <div className={styles.courseWork_open}>
                    <div className={styles.header}>
                        <p>Mở</p>
                        <FontAwesomeIcon className={open ? styles.icon_active : styles.icon} icon={faChevronRight} onClick={() => setOpen(!open)} />
                    </div>
                </div>
                {open && <div className={styles.coursework_content} >

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Bắt đầu lúc 09:00 AM 29/04/2022 kết thúc lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_open}>Mở</p>
                    </div>

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Bắt đầu lúc 09:00 AM 29/04/2022 kết thúc lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_open}>Mở</p>
                    </div>

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Bắt đầu lúc 09:00 AM 29/04/2022 kết thúc lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_open}>Mở</p>
                    </div>
                </div>}

                <div className={styles.courseWork_close}>
                    <div className={styles.header}>
                        <p>Kết thúc</p>
                        <FontAwesomeIcon className={close ? styles.icon_active : styles.icon} icon={faChevronRight} onClick={() => setClose(!close)} />
                    </div>
                </div>
                {close && <div className={styles.coursework_content} >

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Đã kết thúc vào lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_close}>Kết thúc</p>
                    </div>

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Đã kết thúc vào lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_close}>Kết thúc</p>
                    </div>

                    <div className={styles.coursework_content_item}>
                        <div className={styles.item_info}>
                            <FontAwesomeIcon icon={faTableList} />
                            <NavLink className={styles.item_name} to="/" >Hello world</NavLink>
                            <p className={styles.item_time}>Đã kết thúc vào lúc: 09:00 AM 30/04/2022</p>
                        </div>

                        <p className={styles.item_close}>Kết thúc</p>
                    </div>
                </div>}
            </div>

            <div className={styles.courseWork_right_content}>

                <div className={styles.btn_}>
                    <FontAwesomeIcon icon={faCirclePlus} size="2x" />
                    <p>Tạo bài tập</p>
                </div>

                <div className={styles.btn_} id={styles.find}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                    <input placeholder='Tìm kiếm' />
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
    );
}

export default Draft;