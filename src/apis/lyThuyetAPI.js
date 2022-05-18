import axiosClient from "./axiosClient";

const LyThuyetAPI = {
    getAll: (params) =>{
        const url = `LyThuyet/getAll?id=${params}`
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `LyThuyet/getOne?id=${params}`
        return axiosClient.get(url, {params});
    }
}

export default LyThuyetAPI;