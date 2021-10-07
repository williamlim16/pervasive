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

    const value = {
        fetchTopTrashCans
    }
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}