import React from "react";
// Hook
import { useJobsFetch } from "../hooks/useJobsFetch";

export function Jobs() {
    const {
        state,
        loading,
        error,
        setIsLoadingMore
    } = useJobsFetch();

    if (error) return <div>Something went wrong...</div>;

    console.log(state.records);

    return <h1>Hello Jobs!</h1>
}