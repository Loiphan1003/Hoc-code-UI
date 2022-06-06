import axiosClient from "./axiosClient";

const TestCaseBTLT = {
    getTestCasesByID: (id) => {
        const url = `TestCaseLuyenTap/getTestCasesByID?id=${id}`
        return axiosClient.get(url,{id});
    },
    AddTestCase: (input, output, idBTLT) => {
        const url = `TestCaseLuyenTap/AddTestCase?input=${input}&output=${output}&idBTLT=${idBTLT}`
        return axiosClient.post(url, {input}, {output}, {idBTLT});
    },
    DeleteTestCase: (id) => {
        const url = `TestCaseLuyenTap/DeleteTestCase?id=${id}`
        return axiosClient.delete(url,{id});
    },
    EditTestCase: (id, input, output) => {
        const url = `TestCaseLuyenTap/EditTestCase?id=${id}&input=${input}&output=${output}`
        return axiosClient.put(url,{id}, {input}, {output});
    }
}

export default TestCaseBTLT