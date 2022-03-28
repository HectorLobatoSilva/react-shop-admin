import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useFetch = (path = "", method = "GET", body = {}) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await makeFetch(path, method, body);
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.warn(error);
        }
    }, []);

    return data;
};

export const makeFetch = (path = "", method = "GET", body = {}) => {
    const access_token = Cookies.get("access_token");
    const options = {
        method,
        headers: {
            accept: "*/*",
            "Content-Type": "application/json",
        },
    };
    if (method !== "GET") {
        options.body = JSON.stringify(body);
    }
    if (access_token) {
        options.headers.Authorization = `bearer ${access_token}`;
    }
    return fetch(path, options);
};

export default useFetch;
