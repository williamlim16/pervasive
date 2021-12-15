import React, { useContext } from 'react'

const ApiContext = React.createContext()

export function useAPI() {
    return useContext(ApiContext)
}


export function APIProvider({ children }) {
    async function registerTrashCan(val) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/api/registerTrashCan", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(val)
        })
        const data = await res.json()
        return data
    }

    async function fetchTopTrashCans() {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getTopTrashCans")
        const data = await res.json()
        return data
    }

    async function fetchTrashCapacity(id) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getCapacity/" + id)
        const data = await res.json()
        return data
    }

    async function fetchTrashTypes() {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getAllTypesUser")
        const data = await res.json()
        return data
    }

    async function fetchUserTrashCans() {
        const res = await fetch("https://trash-separator-api.herokuapp.com/trash/getTrashCans")
        const data = await res.json()
        return data
    }

    async function fetchUserTrashTypes(id) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getWeeklyTypes/" + id)
        const data = await res.json()
        return data
    }

    async function fetchUserWeeklySummary(id) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getWeeklySummary/" + id)
        const data = await res.json()
        return data
    }

    async function fetchWeeklySummary() {
        const res = await fetch("https://trash-separator-api.herokuapp.com/node/getAllTypesUserSummary")
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
        fetchUserWeeklySummary,
        registerTrashCan
    }
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}