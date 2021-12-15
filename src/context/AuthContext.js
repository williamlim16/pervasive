import React, { useState, useContext, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [isLogin, setIsLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(-1)

    useEffect(() => {
        async function checkLogin() {
            const res = await fetch("https://trash-separator-api.herokuapp.com/api/checkLogin", {
                method: 'POST'
            })
            const data = await res.json()
            if (data.status === "logged in") {
                setIsLogin(true)
                setIsAdmin(data.isAdmin)
            }
        }

        checkLogin()
    }, [])

    function checkUserLogin() {
        return isLogin
    }

    function checkAdmin() {
        return isAdmin
    }

    async function userRegister(val) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/api/register", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(val)
        })
        const data = await res.json()
        if (data.status === "success") {

            alert("Success Register!")
        }
        else {
            alert("Register Failed!")
        }
        return data
    }

    async function userLogin(val) {
        const res = await fetch("https://trash-separator-api.herokuapp.com/api/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(val)
        })
        const data = await res.json()
        if (data.status === "success") {
            alert("Success Login!")
            setIsLogin(true)
        }
        else {
            alert("Login Failed!")
        }
        return data
    }

    async function userLogout() {
        const res = await fetch("https://trash-separator-api.herokuapp.com/api/logout", {
            method: 'POST'
        }).then(
            setIsLogin(false)
        )
        console.log(res)
    }

    const value = {
        userLogin,
        checkUserLogin,
        userLogout,
        userRegister,
        checkAdmin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}