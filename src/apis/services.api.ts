import { client, makeApiCall } from "./axios.config";


export const getAllServices = async () => {
    const response = await makeApiCall({ url: "services", method: "get" })
    return response.data

};
