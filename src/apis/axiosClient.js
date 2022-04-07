import axios from "axios";
import queryString from "query-string";


const getFireBaseToken = async () => {
    const currentUser = firebase.auth().currentUser();
    if (currentUser) {
        console.log("Hava token");
        return currentUser.getIdToken();
    }
    const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
    if(!hasRememberedAccount) return null;

    return new Promise((resolve, reject) =>{
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null);
            }
            const token = await user.getIdToken();
            console.log("[AXIOS] User token: ", token);
            resolve(token);
            unregisterAuthObserver();
        });
    })
}



const axiosClient = axios.create({
    baseURL: "http://localhost:3000/Hoc-code-UI",
    Headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async(config)=>{
    const token = await getFireBaseToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

