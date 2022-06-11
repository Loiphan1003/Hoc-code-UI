import axiosClient from "./axiosClient";

const testCaseBtCode = {
    getOneTestCase: (id) => {
        const url = `TestCaseBT/getOneTestCase?id=${id}`;
        return axiosClient.get(url, {id});
    },
    AddTestCase: (input, output, idBTLT) => {
        const url = `TestCaseBT/AddTestCase?input=${input}&output=${output}&idBTLT=${idBTLT}`
        return axiosClient.post(url, {input}, {output}, {idBTLT});
    },
    DeleteTestCase: (id) => {
        const url = `TestCaseBT/DeleteTestCase?id=${id}`
        return axiosClient.delete(url,{id});
    },
    EditTestCase: (id, input, output) => {
        const url = `TestCaseBT/EditTestCase?id=${id}&input=${input}&output=${output}`
        return axiosClient.put(url,{id}, {input}, {output});
    }
}

export default testCaseBtCode