import axiosClient from "./axiosClient";

const GiangVienAPI = {
    getAll: () =>{
        const url = `GiangVien/getAllGV`
        return axiosClient.get(url);
    },
    AddGV: (id, ten, mail, date, shool) => {
        const url = `GiangVien/AddGV?id=${id}&ten=${ten}&mail=${mail}&date=${date}&shool=${shool}`
        return axiosClient.post(url,{id},{ten},{mail},{date},{shool});
    },
    RemoveGV: (id) => {
        const url = `GiangVien/RemoveGV?id=${id}`
        return axiosClient.delete(url,{id});
    },
    EditGV: (id, ten, mail, date, shool) => {
        const url = `GiangVien/EditGV?id=${id}&ten=${ten}&mail=${mail}&date=${date}&shool=${shool}`
        return axiosClient.put(url,{id},{ten},{mail},{date},{shool});
    },
    getOneGV: (uID) => {
        const url = `GiangVien/getOneGV?uID=${uID}`;
        return axiosClient.get(url, {uID})
    }
}

export default GiangVienAPI;