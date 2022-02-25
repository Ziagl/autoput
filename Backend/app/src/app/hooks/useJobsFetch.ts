import { useState, useEffect } from 'react';
import Api, { Job } from '../api/Api';

const initialState = {
    pageno: 1,
    records: [] as Job[],
};

export const useJobsFetch = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchJobs = async (page: number) => {
        try {
            setError(false);
            setLoading(true);

            // get token
            const jwt = await Api.generateToken();
            // use token to get jobs
            const jobs = await Api.fetchData('job/read.php', jwt, page);

            setState(prev => ({
                ...jobs,
                results:
                    page > 1 ? [...prev.records, ...jobs.records] : [...jobs.records]
            }));
        } catch (error) {
            console.log(error);
            setError(true);
        }
        setLoading(false);
    };

    // load initial
    useEffect(() => {
        fetchJobs(1);
    });

    // load more
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchJobs(state.pageno + 1);
        setIsLoadingMore(false);
    }, [isLoadingMore, state.pageno]);

    return { state, loading, error, setIsLoadingMore };
};