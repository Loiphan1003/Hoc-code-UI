import axiosClient from "./axiosClient";

const BaiTapLuyenTapAPI = {
    getAll: () =>{
        const url = 'BTLuyenTap/getAll'
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `BTLuyenTap/getOne?id=${params}`
        return axiosClient.get(url, {params});
    },
    add: (btLuyenTapAndTestCases) =>{
        const url = 'BTLuyenTap/add';
        return axiosClient.post(url,btLuyenTapAndTestCases);
    }
    // deleteBaiTapCode: (id) => {
    //     const url = `BaiTapCode?id=${id}`;
    //     return axiosClient.delete(url,{id});
    // },
    // searchBaiTapCode: (value) => {
    //     const url = `BaiTapCode/search?searchValue=${value}`
    //     return axiosClient.get(url,{value})
    // }

}

export default BaiTapLuyenTapAPI;