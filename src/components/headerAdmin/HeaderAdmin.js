import React from 'react'
import { NavLink } from "react-router-dom";
import styles from './HeaderAdmin.module.css'
import companyLogo from '../../images/logo_transparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons';

function HeaderAdmin() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerAdmin}>
            <NavLink to="/Hoc-code-UI">
                <img src={companyLogo} alt="Logo"className={styles.logoAdmin} />
            </NavLink>
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default HeaderAdmin