import React, { useContext } from 'react'

const ApiContext = React.createContext()

export function useAPI() {
    return useContext(ApiContext)
}


export function APIProvider({ children }) {
    async function fetchTopTrashCans() {
        const res = await fetch("./node/getTopTrashCans")
        const data = await res.json()
        return data
    }

    async function fetchTrashCapacity(id) {
        const res = await fetch("./node/getCapacity/" + id)
        const data = await res.json()
        return data
    }

    async function fetchTrashTypes() {
        const res = await fetch("./node/getAllTypesUser")
        const data = await res.json()
        return data
    }

    async function fetchUserTrashCans() {
        const res = await fetch("./trash/getTrashCans")
        const data = await res.json()
        return data
    }

    async function fetchUserTrashTypes(id) {
        const res = await fetch("./node/getWeeklyTypes/" + id)
        const data = await res.json()
        return data
    }

    async function fetchUserWeeklySummary(id) {
        const res = await fetch("./node/getWeeklySummary/" + id)
        const data = await res.json()
        return data
    }

    async function fetchWeeklySummary() {
        const res = await fetch("./node/getAllTypesUserSummary")
        const data = await res.json()
        return data
    }

    const value = {
        fetchTopTrashCans,
        fetchTrashCapacity,
        fetchTrashTypes,
        fetchUserTrashCans,
        fetchUserTrashTypes,
        fetchWeeklySummary,
        fetchUserWeeklySummary
    }
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}