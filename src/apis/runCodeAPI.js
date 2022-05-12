import axiosClient from "./axiosClient";

const RunCodeAPI = {
    postRunCode: (runCodeRequest) =>{
        const url = 'runCode';
        return axiosClient.post(url,runCodeRequest);
    },
    postRunCodes: (runCodeRequest,id) => {
        const url = `runCodes?id=${id}`;
        return axiosClient.post(url,runCodeRequest,{id});
    },
    getTestCaseByID: (id) => {
        const url = `TestCase?id=${id}`;
        return axiosClient.get(url,{id});
    }
}

export default RunCodeAPI;