import axios from "axios";
import Toast from "react-native-toast-message";
import { URL } from 'react-native-url-polyfill';


export function ErrorHandlerApi(e: any) {
    const errors: string[] = [];
    const errorResponse = e.response.data;

    if (errorResponse.errors && errorResponse.errors.lenght > 0) {
        for (const [key, value] of Object.entries(errorResponse.errors)) {
            errors.push(value as string);
        }
        return;
    }

    if (errorResponse.error) {
        const values = Object.values(errorResponse.error);
        values.map((val) => {
            Array.isArray(val) ? errors.push(val[0]) : errors.push(val as string);
        });
    }
    return errors.join(" ");
}

export function showToastMessage(type: "success" | "error", title: string, body: string) {
    Toast.show({
        type: type,
        text1: title,
        text2: body,

    });
}

export function httpErrorHandler(error: any) {
    if (error === null) throw new Error('Unrecoverable error!! Error is null!')
    if (axios.isAxiosError(error)) {
        const response = error?.response
        const request = error?.request

        if (error.code === 'ERR_NETWORK') {
            return 'connection problems..'
        } else if (error.code === 'ERR_CANCELED') {
            console.log('connection canceled..')
        }
        if (response) {
            //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
            return response.data.message
        } else if (request) {
            return "something went wrong"
        }
    }
    return "something went wrong"
}


export function isValidHttpUrl(s: string) {
    try {
        const newUrl = new URL(s);
        console.log({ pro: newUrl.protocol });

        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
        console.log("er", err);

        return false;
    }
}

export function isValidIpAddress(ip: string) {
    if (!ip) return false
    const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
    const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
    return regex.test(ip);

}
export const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export const fixNumbers = (number: number = 0, fixNumber = 1) => {

    return number?.toFixed(fixNumber)
}



export const pagination = 1