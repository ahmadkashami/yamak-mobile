import { useEffect, useState } from 'react';
import { apiCallProps, makeApiCall } from '../apis/axios.config';
import { useErrorStore } from '../store/AppError.store';

const useFetchV2 = ({ method, url, data, params }: apiCallProps) => {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null)
    const [error, setError] = useState(null);
    const setErrorFlashMessage = useErrorStore((state) => state.setError)

    useEffect(() => {
        if (url)
            sendRequest()
    }, [method, url])



    const sendRequest = async () => {
        try {
            setLoading(true);
            const response = await makeApiCall({ method, url, data, params });
            setResponseData(response.data)
        } catch (error) {
            setError(error);
            setErrorFlashMessage(error.message)

        } finally {
            setLoading(false);
        }
    };
    const refetch = async () => {
        await sendRequest();
    };
    return { loading, error, responseData, refetch };
};

export default useFetchV2;