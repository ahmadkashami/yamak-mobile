import { client, makeApiCall } from "./axios.config";


export const getUserProfile = async () => {
    // const response = await client.get(`/app-users/profile`)
    const response = await makeApiCall({ url: "app-users/profile", method: "get", })

    return response.data
};


export const updateUserProfile = async (payload) => {
    // const response = await client.patch(`/app-users/profile`, payload)
    const response = await makeApiCall({ url: "app-users/profile", method: "patch", data: payload })

    return response.data
};


export const updateUserPushToken = async (token: string) => {
    const payload = { notificationToken: token }

    return updateUserProfile(payload)
}


export const deleteAccount = async () => {
    const response = await client.delete("/app-users/account");
    return response.data;
};