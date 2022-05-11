import axiosClient from "./axiosClient";

const RoomApi = {
    getCoursework: (params) =>{
        const url = 'todos/?userId=1';
        return axiosClient.get(url);
    },
    getRoomInfo: (params) => {
        const url = `users/${params}`;
        return axiosClient.get(url);
    }
}

export default RoomApi;