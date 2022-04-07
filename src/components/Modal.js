import useLookBodyScroll from "./useLockBodyScroll";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { getNodeText } from "@testing-library/react";


function Modal() {
    useLookBodyScroll();

    


    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'redirect',
        signInSuccessUrl: '/home',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],

    };

    return (
        <div className="modal">
            <h1>Đăng nhập</h1>
            <input className="input" placeholder="Tài khoản" />
            <input className="input" placeholder="Mật khẩu" />
            <button type="button" className="btnLogin">Đăng nhập</button>
            <span>Hoặc đăng nhập bằng</span>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Modal;