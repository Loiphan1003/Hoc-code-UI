import axiosClient from "./axiosClient";

const PhongHocAPI = {
    getByUid: (uID) =>{
        const url = `PhongHoc/getByUid?uID=${uID}`;
        return axiosClient.get(url,{uID});
    },
    joinPhongHoc: (uID,id) => {
        const url = `PhongHoc/addUser?uID=${uID}&id=${id}`;
        return axiosClient.post(url,{uID,id});
    },
    getOneByID:(id)=>{
        const url = `PhongHoc/getOne?id=${id}`;
        return axiosClient.get(url,{id});
    }
}

export default PhongHocAPI;