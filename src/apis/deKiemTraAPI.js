import axiosClient from "./axiosClient";

const DeKiemTraAPI = {
    add: (body) =>{
        const url = 'DeKiemTra';
        return axiosClient.post(url,body);
    },
    getOneById: (id) => {
        const url = `DeKiemTra/getById?id=${id}`
        return axiosClient.get(url,{id});
    },
    getByIDPhonng(id)
    {
        const url = `DeKiemTra/getByIdPhong?id=${id}`
        return axiosClient.get(url,{id});
    },
    publicDeKiemTra:(id)=>{
        const url = `DeKiemTra/public-de-kiem-tra?id=${id}`
        return axiosClient.post(url,{id});
    }
}

export default DeKiemTraAPI;