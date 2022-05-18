import axiosClient from "./axiosClient";

const CourseApi = {
    getAll: () =>{
        const url = 'MonHoc/getAll';
        return axiosClient.get(url);
    },
    getOne: (params) =>{
        const url = `MonHoc/getOne?id=${params}`
        return axiosClient.get(url, {params});
    }
}

export default CourseApi;