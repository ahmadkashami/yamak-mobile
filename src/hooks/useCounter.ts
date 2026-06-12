import { useEffect, useState } from "react";



export const useCounter = () => {

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        let timeout
        if (counter > 0) {
            timeout = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
        return () => clearTimeout(timeout)
    }, [counter]);


    return { counter, setCounter }

}