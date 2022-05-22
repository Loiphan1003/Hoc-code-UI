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
    deleteBaiTapTN: (id) => {
        const url = `BaiTapTracNghiem?id=${id}`;
        return axiosClient.delete(url,{id});
    },
    searchBaiTapTN: (value) => {
        const url = `BaiTapTracNghiem/search?searchValue=${value}`
        return axiosClient.get(url,{value})
    }

}

export default BaiTapTN;