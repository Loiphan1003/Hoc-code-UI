import axiosClient from "./axiosClient";

const LyThuyetAPI = {
    getAll: (params) =>{
        const url = `LyThuyet/getAll?id=${params}`
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `LyThuyet/getOne?id=${params}`
        return axiosClient.get(url, {params});
    },
    AddLT: (LyThuyets_Custom) => {
        const url = `LyThuyet/AddLT`
        return axiosClient.post(url, LyThuyets_Custom); 
    },
    countAll: () => {
        const url = `LyThuyet/countAll`
        return axiosClient.get(url); 
    },
    EditLT: (LyThuyets_Custom) => {
        const url = `LyThuyet/EditLT`
        return axiosClient.put(url, LyThuyets_Custom); 
    },
    DeleteLT: (id) => {
        const url = `LyThuyet/DeleteLT?id=${id}`
        return axiosClient.delete(url, {id}); 
    }
}

export default LyThuyetAPI;