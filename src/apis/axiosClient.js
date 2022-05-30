import axios from "axios";
import queryString from "query-string";
import {auth} from '../firebase/config';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    Headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {

    // const currentUser = auth.currentUser;
    // if(currentUser) {
    //     const token = await currentUser.getIdToken();
    //     console.log("Token: ", token);
    //     config.headers.Authorization = `Barer ${token}`;
    // }
    // const token = await getFireBaseToken();
    // if(token){
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
})

axios.interceptors.response.use(function (response) {
    if(response && response.data){
        return response.data;
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default axiosClient;