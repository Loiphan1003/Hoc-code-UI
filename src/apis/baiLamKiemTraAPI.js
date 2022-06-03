import axiosClient from "./axiosClient";

const BaiLamkiemTraAPI = {
    add: (body) =>{
        const url = 'BaiLamKiemTra';
        return axiosClient.post(url,body);
    },
    getTestOverview: (id) =>{
        const url= `BaiLamKiemTra/test-overview?id=${id}`;
        return axiosClient.get(url,{id});
    },
    getDetailTest:(idBaiLamKT)=>{
        const url= `BaiLamKiemTra/test-detail?id=${idBaiLamKT}`;
        return axiosClient.get(url,{idBaiLamKT});
    }
}

export default BaiLamkiemTraAPI;