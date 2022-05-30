import axiosClient from "./axiosClient";

const BaiTapCodeAPI = {
    getAll: () => {
        const url = `BaiTapCode/getAll`
        return axiosClient.get(url);
    },
    getOne: (params) => {
        const url = `BaiTapCode/getOne?id=${params}`
        return axiosClient.get(url, { params });
    },
    postAddBaiTapCode: (btCodeAndTestCases) => {
        const url = 'BaiTapCode/postBaiTapCode';
        return axiosClient.post(url, btCodeAndTestCases);
    },
    deleteBaiTapCode: (id) => {
        const url = `BaiTapCode?id=${id}`;
        return axiosClient.delete(url, { id });
    },
    getListBaiTapCodeByuID: (uID) => {
        const url = `BaiTapCode/getListByUId?uID=${uID}`;
        return axiosClient.get(url);
    }

}

export default BaiTapCodeAPI;