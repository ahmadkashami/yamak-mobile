import { AppApiPath } from "./apisPath";
import { makeApiCall } from "./axios.config";

export const getUserCars = async () => {
    // const response = await client.patch(`/app-users/profile`, payload)
    const response = await makeApiCall({ url: AppApiPath.userCarsListApi, method: "get", })

    return response.data
};





export const addUserCars = async (payload) => {
    const response = await makeApiCall({ url: "user-cars", method: "post", data: payload })

    return response.data
};


export const deleteUserCars = async (id: string) => {
    const response = await makeApiCall({ url: `user-cars/${id}`, method: "delete" })
    console.log({ response });

    return response.data
};