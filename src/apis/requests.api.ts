import { AppApiPath } from "./apisPath";
import { makeApiCall } from "./axios.config";

export const sendOrderRequests = async (data: any) => {
    const response = await makeApiCall({ url: AppApiPath.orderRequests, method: "post", data })

    return response.data
};