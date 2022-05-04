import axiosClient from "./axiosClient";

const RunCodeAPI = {
    postRunCode: (runCodeRequest) =>{
        const url = 'api/runCode';
        return axiosClient.post(url,runCodeRequest);
    }
}

export default RunCodeAPI;