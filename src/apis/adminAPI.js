import axiosClient from "./axiosClient";

const AdminAPI = {
    login: (admin) => {
        const url = 'Admin/login';
        return axiosClient.post(url, admin);
    }
}

export default AdminAPI;