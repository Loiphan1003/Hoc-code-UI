import axiosClient from "./axiosClient";

const BaiTapCodeAPI = {
    getAll: () =>{
        const url = 'BaiTapCode/getAll'
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `BaiTapCode/getOne?id=${params}`
        return axiosClient.get(url, {params});
    },
    postAddBaiTapCode: (btCodeAndTestCases) =>{
        const url = 'BaiTapCode/postBaiTapCode';
        return axiosClient.post(url,btCodeAndTestCases);
    },
    deleteBaiTapCode: (id) => {
        const url = `BaiTapCode?id=${id}`;
        return axiosClient.delete(url,{id});
    },
    searchBaiTapCode: (value) => {
        const url = `BaiTapCode/search?searchValue=${value}`
        return axiosClient.get(url,{value})
    }
    

}

export default BaiTapCodeAPI;