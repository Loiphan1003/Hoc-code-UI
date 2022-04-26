import axiosClient from "./axiosClient";

const CourseApi = {
    getAll: (params) =>{
        const url = '/users';
        return axiosClient.get(url, {params});
    },
}

export default CourseApi;