// PUNYASHREE DAS-22BCSH93
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ name, setName ] = useState(localStorage.getItem("name"))
    const [ token, setToken ] = useState(localStorage.getItem("storeToken"))

    function login(data){
        setName(data.name)
        setToken(data.token)
        localStorage.setItem("name", data.name)
        localStorage.setItem("storeToken", data.token)
    }
    function logout(){
        setName(null)
        setToken(null)
        localStorage.removeItem("name")
        localStorage.removeItem("storeToken")
    }

    return (
        <AuthContext.Provider value={{ name, token, login, logout }}>
            { children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}