import { useState, useEffect, useCallback } from 'react';
import { getItemAsync } from 'expo-secure-store';

export const useFetch = ({ url, method = 'GET', body = null, headers = {}, auth = false }, autoFetch = true) => {

    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(autoFetch);
    const [isError, setError] = useState(null);

    const fetchData = useCallback(async () => {

        let token = null;

        if (auth) {

            token = await getItemAsync('token');

        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                ...(body && { body: JSON.stringify(body) }),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || 'Something went wrong');

            setData(result);
        } catch (error) {
            setError(error.message || 'Error fetching data');
        } finally {
            setLoading(false);
        }
    }, [url, method, body, headers]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData]);

    return { data, isLoading, isError, refetch: fetchData };
};