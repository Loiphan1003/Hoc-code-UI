import axiosClient from "./axiosClient";

const BaiLamkiemTraAPI = {
    add: (body) =>{
        const url = 'BaiLamKiemTra';
        return axiosClient.post(url,body);
    }
}

export default BaiLamkiemTraAPI;