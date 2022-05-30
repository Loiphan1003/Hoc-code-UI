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
    },
    getListBaiTapTNByuID: (uID) => {
        const url = `BaiTapTracNghiem/getListByUId?uID=${uID}`;
        return axiosClient.get(url);
    },
    deleteBaiTapTN: (id) => {
        const url = `BaiTapTracNghiem/deleteBaiTapTN?id=${id}`;
        return axiosClient.delete(url);
    }

}

export default BaiTapTN;