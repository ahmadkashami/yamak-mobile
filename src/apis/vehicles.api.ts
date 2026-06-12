import { AppLimitList, AsyncStorageConstants } from "../constants/CommonConsstats";
import { getStorageValues } from "../helpers/AppAsyncStoreage";
import { AppApiPath } from "./apisPath";
import { makeApiCall } from "./axios.config";


export const getVehicleById = async (id: string) => {
    const response = await makeApiCall({ url: `/vehicles/${id}`, method: "get" })
    return response?.data
};

export const getAllVehicles = async (params: any = { page: 1, limit: AppLimitList }) => {
    const userLocation = await getStorageValues(AsyncStorageConstants.userLocation)
    const location = JSON.parse(userLocation as string)
    const response = await makeApiCall({ url: AppApiPath.vehiclesListApi, method: "get", params: { ...location, ...params } })
    return response?.data?.list
};