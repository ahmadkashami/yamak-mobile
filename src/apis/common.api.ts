import { makeApiCall } from "./axios.config";


export const getAppSetting = async () => {
    // const response = await client.post("auth/api/mobile/client/v1/login", body);
    const response = await makeApiCall({ url: "app-setting", method: "get" })

    return response.data;
}
export const getAllAdds = async () => {
    // const response = await client.post("auth/api/mobile/client/v1/login", body);
    const response = await makeApiCall({ url: "adds", method: "get" })

    return response.data;
}