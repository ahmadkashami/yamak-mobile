import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { client } from "../apis/axios.config";
import { useErrorStore } from "../store/AppError.store";


export function useFetch({ endPoint, method = "get", body = null, headers = null }: { endPoint: string, method: "get" | "post", body?: Object | null, headers?: Object | null }) {
    const [data, setData] = useState<any>([])
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null)
    const setErrorFlashMessage = useErrorStore((state) => state.setError)

    const fetchData = () => {

        //@ts-ignore
        client[method](endPoint, JSON.parse(headers), JSON.parse(body))
            .then((res: any) => {
                setData(res.data.data);
            })
            .catch((err) => {
                setError(err)
                setErrorFlashMessage(err.message)
            })
            .finally(() => {
                setloading(false);
            });

    }
    useEffect(() => {
        fetchData();
    }, [method, endPoint, body, headers]);


    return { data, setData, loading, error }

}


// export function useFetchCallBack(callBackFn: () => Promise<AxiosResponse>) {
//     const [data, setData] = useState([])
//     const [loading, setloading] = useState(true);
//     const [error, setError] = useState(null)

//     const fetchData = async () => {
//         setloading(true)
//         try {
//             const response = await callBackFn()
//             setData(response.data.data)
//             setloading(false)
//         } catch (error: any) {
//             setError(error);
//             alert("hello error")
//             Alert.alert("error happen", error.message)
//         } finally {
//             setloading(false)
//         }
//     }
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const reFetch = () => {
//         setloading(true)
//         fetchData()
//     }


//     return { data, loading, error, reFetch }

// }