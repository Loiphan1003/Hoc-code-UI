import axiosClient from "./axiosClient";

const DeKiemTraAPI = {
    add: (body) =>{
        const url = 'DeKiemTra';
        return axiosClient.post(url,body);
    }
}

export default DeKiemTraAPI;