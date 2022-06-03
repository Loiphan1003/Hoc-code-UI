import axiosClient from "./axiosClient";

const GiangVienAPI = {
    getAll: () =>{
        const url = `GiangVien/getAllGV`
        return axiosClient.get(url);
    },
    RemoveGV: (id) => {
        const url = `GiangVien/RemoveGV?id=${id}`
        return axiosClient.delete(url,{id});
    },
    AddOrUpdate: (id, ten, mail, date, shool,avatar,tenHienThi) => {
        const url = `GiangVien/AddOrUpdate?id=${id}&ten=${ten}&mail=${mail}&date=${date}&shool=${shool}&linkAvatar=${avatar}&tenHienThi=${tenHienThi}`
        return axiosClient.put(url,{id},{ten},{mail},{date},{shool},{avatar},{tenHienThi});
    },
    getOneGV: (uID) => {
        const url = `GiangVien/getOneGV?uID=${uID}`;
        return axiosClient.get(url, {uID})
    }
}

export default GiangVienAPI;