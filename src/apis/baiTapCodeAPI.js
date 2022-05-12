import axiosClient from "./axiosClient";

const BaiTapCodeAPI = {
    getAll: () =>{
        const url = 'BaiTapCode/getAll'
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `BaiTapCode/getOne?id=${params}`
        return axiosClient.get(url, {params});
    }
}

export default BaiTapCodeAPI;