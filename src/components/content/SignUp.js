import React from 'react';
import styles from './SignUp.module.css';
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function SignUp({ close }) {

    const handleSignUp = () => {

    }



    return (
        <div className={styles.signUp} >
            <div className={styles.signUpHeader} >
                <h1>Đăng ký</h1>
                <FontAwesomeIcon icon={faXmark} onClick={() => close(false)} />
            </div>
            <div className={styles.signUp_content} >
                <TextField required label="Email" type='email' variant="outlined" />
                <TextField label="Mật khẩu" type='password' variant="outlined" />
                <TextField label="Ngày sinh" defaultValue="2022-05-12"
                    type='date' variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField required label="Trường học" type='text' variant="outlined" />
            </div>
            <button onClick={() => handleSignUp} >Đăng ký thành viên</button>
        </div>
    );
}

export default SignUp;