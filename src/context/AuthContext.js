import React, { useState, useContext, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        async function checkLogin() {
            const res = await fetch("./api/checkLogin", {
                method: 'POST'
            })
            const data = await res.json()
            data.status === "logged in" ? setIsLogin(true) : setIsLogin(false)
        }

        checkLogin()
    }, [])

    function checkUserLogin() {
        return isLogin
    }

    async function userRegister(val) {
        const res = await fetch("./api/register", {
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
        const res = await fetch("./api/login", {
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
        const res = await fetch("./api/logout", {
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
        userRegister
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}