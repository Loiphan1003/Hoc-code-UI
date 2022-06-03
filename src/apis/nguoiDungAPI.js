import axiosClient from "./axiosClient";

const NguoiDungAPI = {
    getAll: () =>{
        const url = `NguoiDung/getAllNguoiDung`
        return axiosClient.get(url);
    },
    RemoveNguoiDung: (id) => {
        const url = `NguoiDung/RemoveNguoiDung?id=${id}`
        return axiosClient.delete(url,{id});
    },
    AddOrUpdate: (id, ten, tenHienThi, avatar, mail, date, shool) => {
        const url = `NguoiDung/AddOrUpdate?id=${id}&ten=${ten}&tenHienThi=${tenHienThi}&linkAvatar=${avatar}&mail=${mail}&date=${date}&shool=${shool}`
        return axiosClient.put(url,{id},{ten},{tenHienThi},{mail},{date},{shool});
    },
    getSoLuongUser: () => {
        const url = `NguoiDung/getSoLuongUser`
        return axiosClient.get(url);
    },
    getThongTinNguoiDung: (uID) => {
        const url = `NguoiDung/getOne?uID=${uID}`;
        return axiosClient.get(url, {uID});
    }
}

export default NguoiDungAPI;