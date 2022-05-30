import React from 'react'
import HeaderAdmin from '../../components/headerAdmin/HeaderAdmin';
import Sider from '../../components/sider/Sider';
import styles from './index.module.css'

function HomeAdmin({children}) {
  return (
    <div>
      <div className={styles.bodys}>
          <div>
              <Sider></Sider>
          </div>
          <div className={styles.bodyss}>
              {children}
          </div>
      </div>
      <script>
        const sider = document.qu
      </script>
    </div>
  )
}

export default HomeAdmin;