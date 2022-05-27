import axiosClient from "./axiosClient";

const DeKiemTraAPI = {
    add: (body) =>{
        const url = 'DeKiemTra';
        return axiosClient.post(url,body);
    },
    getOneById: (id) => {
        const url = `DeKiemTra/getById?id=${id}`
        return axiosClient.get(url,{id});
    }
}

export default DeKiemTraAPI;