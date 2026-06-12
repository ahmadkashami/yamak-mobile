import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { client } from "../apis/axios.config";

const useItemByIdData = (url: string, method: string, itemId: string | undefined) => {
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchData = () => {
        setLoading(true)
        //@ts-ignore
        client[method](url, null, null)
            .then((res: any) => {
                setItemData(res.data.data);
            })
            .catch((err: any) => {
                setError(err);
                Alert.alert("error happen", err.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        if (itemId) {
            fetchData()

            // fetch(`https://api.example.com/items/${itemId}`)
            //     .then((response) => response.json())
            //     .then((data) => setItemData(data))
            //     .catch((error) => console.error(error));
        }
    }, [itemId]);

    return { itemData, error, loading };
};


export default useItemByIdData