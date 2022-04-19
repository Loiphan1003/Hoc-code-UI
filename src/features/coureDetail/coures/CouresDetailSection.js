import React from 'react';
import styles from './CouresSection.module.css';

import test1 from '../../../images/test1.png';
import test2 from '../../../images/test2.png';


function CouresDetailSection(props) {
    return (
        <div>
            <div className={styles.header}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABAElEQVRoge3ZsS7FYBjH4ecQV8BhM3E9EoR7EaO4F2IwiGsRZxIGYpRYj0G6oO3XRL394n2Srs1v+J+c9isppfQf7OIW73jEKVZDiwaY4wnLL9d5ZNQQF77HL/GGtcCuIod+jm+u9bi0fnO8aI+/j0sr0zad5jqKS+u3pzv+Oi6t3waetce/YiusrsClnE6MnE6knE6kqqdzoDv+Ki6t3wx3uqezGVZXYNsEprMy4r1nI977V1Q/IdhX8Y+40ffcfxyXVqb6PzIqf5Ro5JSmIKc0BTmlqaj6YIv+o8VFXFq5qg93G1Ufr9P+geMsMmqoHdz4/MT0gBPjvkyllNIf+QAGbANsLkCUBwAAAABJRU5ErkJggg==" alt='icon' />
                <h1>Bài 1: Khái niệm về biến</h1>
            </div>

            <div className={styles.content}>
                <p><span className={styles.textH1}>Khái niệm:</span><br/>
                    Một biến trong C không là gì nhưng là một tên được đưa ra đến bộ nhớ lưu trữ để chương trình có thể thao tác. Mỗi biến trong C có một kiểu xác định, để xác định cỡ và layout cho bộ nhớ biến đó. Phạm vi của giá trị có thể được dự trữ trong bộ nhớ, việc thiết lập các biểu thức có thể được áp dụng với biến. </p>
                <img src={test1} alt="courser_image"/>
                <img src={test2} alt="courser_image"/>
            </div>
        </div>
    );
}

export default CouresDetailSection;