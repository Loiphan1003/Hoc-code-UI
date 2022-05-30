import axiosClient from "./axiosClient";

const RoomApi = {
    getCoursework: (params) => {
        const url = 'todos/?userId=1';
        return axiosClient.get(url);
    },
    getRoomInfo: (params) => {
        const url = `/users`;
        return axiosClient.get(url);
    },
    createRoom: (room) => {
        const url = 'PhongHoc/createRoom';
        return axiosClient.post(url, room);
    },
    getRoomInfoByGiangVien: (uID) => {
        const url = `PhongHoc/getByUid?uID=${uID}`;
        return axiosClient.get(url, { uID });
    },
    addUserToPhongHoc: (uID, idPhong) => {
        const url = `PhongHoc/addUser?uID=${uID}&id=${idPhong}`
        return axiosClient.post(url, { uID, idPhong });
    },
    getByUid: (uID) => {
        const url = `Room/getByUid?uID=${uID}`;
        return axiosClient.get(url,{uID})
    },
    getRoomByUIdStudent: (uID) => {
        const url = `PhongHoc/getByUidStudent?uID=${uID}`
        return axiosClient.get(url, {uID});
    }

}

export default RoomApi;