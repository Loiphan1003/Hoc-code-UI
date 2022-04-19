import React from 'react';


import Header from '../header/Header';
import Footer from '../footer/Footer';
import Course from './Course';
import CourseAdvanced from './CourseAdvanced';
import image1 from '../../images/headerTheory.png';
import styles from './Theory.module.css';

function Theory(props) {



    return (
        <div>
            <Header data={props.data} />
            <div className={styles.theory}>
                <div className={styles.theoryHeader} src={image1}>
                    <div>
                        <h1>Tìm hiểu lý thuyết cùng Code Academy</h1>
                        <div className={styles.findTheory}>
                            <input type='text' className={styles.nameTheory} placeholder='Nhập nội dung tìm kiếm' />
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADBklEQVRIia2UT2gUVxzHP783m2xAiC3uJuKl0K67zk42tbanEHT7B08ltxSK2uLFm6UggnjspRRKL+JJbOmhB1MKiq1YqJVSqlDay2ZnMls1l3pIdtbQaLUaM/PrYWfXTdidbDDf0/v9e5/3e/PmJyQon89nBgdNPorMdmOi5fSjFffP+fnlpJpukm6+YrE4LehxYAIwHbFVgRsq+rnr+t8DumnIa7lcdiU98C3KgT4Kr6iYI67rLvUNcRxnJxr9CuRi1wrCDxLxi8KiwKgKbyK8i2LF5X4YRZO+79/bEFIul1ON+uI1hf2x9yaYD1zXvb2+YLxQKIQp8w3K6/EGP1W9uYMkXJ0BCIKFQ20A8tvw8oO3uwEAKrVazbIGDqD8QXPnd8Zs+72kTpofVeVkbD8WY96/effuf0lFlUrlYah6CHgagz5KhNi2/RLgNGFcqFarfycVtOT7/l+glwAQJvL5fKYnRET2tgyBa/0A2vkqP7fWlmXt7ZVnRKIXWoYarW8GAiw8g+hwT0gUSecfvGMzBO3MD+VBT4iI3GoZoq0X1qfMs3w1ptYrTQCcon0beAW4b6UGdlcqlQ2vrVAo7EpZ5g4whDDrunPjvc/SRJ2N7eFwdeXcNK0/urvK5XIqZcxXwFDcx5mk/Hj4mbMgfnMtU17R/q5UKr3YrWBsbGw0qC9cRjjY8kkkjSRIe3bZtr3bCDeATBxZVtWvVeU6sGSMZkHeQjkMrH9JTxU57HneTCIEoFTK74ki6yJKIelksR7Tvi5ACEXlWNXzvlyfuObu6/V7jVx66PyTwfR9hD3A9i7nmkf5ZCCdPqJh+AbwchwwwFQ2O7IUBMHvPTtZv5vjOK+qqiMSbQP+NSGzs75fJZ64uVwunR5MzYBMdRYqetrz/E/7gfSlabA82z6P8OGagPKZOzd3CjZ4qv3IAy03GpeDkewuYF87IEyOZjM76kHj6nN30iFxHPsLlI/XevXoc3fSqSBo/Dgykk1B53gy/pZCYtD10Uz2H4RJhFqknNhqRlf9D/W9BWlYXpQbAAAAAElFTkSuQmCC" alt='find' />
                        </div>
                    </div>
                    <img src={image1} alt='imageHeaderTheory'/>
                </div>

                <div className={styles.kienthuccoso}>
                    <h1>Kiến thức cơ sở</h1>
                    <Course />
                </div>

                <div className={styles.kienthucnangcao}>
                    <h1>Kiến thức nâng cao</h1>
                    <CourseAdvanced/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Theory;