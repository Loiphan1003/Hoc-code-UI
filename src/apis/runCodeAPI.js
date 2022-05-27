import axiosClient from "./axiosClient";

const RunCodeAPI = {
    postRunCode: (runCodeRequest) => {
        const url = 'runCode';
        return axiosClient.post(url,runCodeRequest);
    },
    postRunCodes: (runCodeRequest,id) => {
        const url = `runCodesLuyenTap?id=${id}`;
        return axiosClient.post(url,runCodeRequest,{id});
    },
    postRunCodeBaiTap: (runCodeRequest,id) => {
        const url = `runCodesBaiTap?id=${id}`;
        return axiosClient.post(url,runCodeRequest,{id});
    },
    getTestCaseLuyenTapByID: (id) => {
        const url = `TestCaseLuyenTap?id=${id}`;
        return axiosClient.get(url,{id});
    },
    getTestCaseBTByID: (id) => {
        const url = `TestCaseBT?id=${id}`;
        return axiosClient.get(url,{id});
    }
}

export default RunCodeAPI;