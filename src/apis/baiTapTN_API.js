import axiosClient from "./axiosClient";

const BaiTapTN = {
    getAll: () =>{
        const url = 'BaiTapTracNghiem/getAll'
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `BaiTapTracNghiem/getOne?id=${params}`
        return axiosClient.get(url, {params});
    },
    postAddBaiTapTN: (btTN) =>{
        const url = 'BaiTapTracNghiem/addBaiTapTN';
        return axiosClient.post(url,btTN);
    }

}

export default BaiTapTN;