import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { LoginApi, RegisterApi } from "../Services/AuthService";

const userContext = createContext(null);

export function UserProvider(props) {
    const { children } = props;
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [isReady, setIsReady] = useState();

    useEffect(() => {
        // On load
        const userStorage = localStorage.getItem('user');
        const tokenStorage = localStorage.getItem('token');
        if (userStorage && tokenStorage) {
            setUser(JSON.stringify(userStorage));
            setToken(tokenStorage);
            axios.defaults.headers.common["Authorization"] = "Bearer " + tokenStorage;
        }
        setIsReady(true);
    }, [])

    const RegisterUser = async (email, password, firstName, lastName) => {
        await RegisterApi(email, password, firstName, lastName)
            .then((res) => {
                const userObj = {
                    email: res.email,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    token: res.token,
                };
                localStorage.setItem("user", userObj);
                localStorage.setItem("token", res.token);
                setUser(userObj);
                setToken(res.token);
                toast.success(`Registration successfull, Welcome ${userObj.firstName}`);
                navigate('/');
            })
            .catch((err) => {
                toast.warning('Registration requirements were not matched');
                console.log('err',err);
            })
    }

    const LoginUser = async (email, password) => {
        await LoginApi(email, password)
            .then((res) => {
                if (!res) {
                    toast.error("Incorrect Username or Password");
                    return;
                }
                const userObj = {
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    token: res.data.token,
                };
                localStorage.setItem("user", userObj);
                localStorage.setItem("token", res.data.token);
                setUser(userObj);
                setToken(res.token);
                toast.success(`Login successfull, Welcome back ${userObj.firstName}`);
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const IsLoggedIn = () => {
        if (user)
            return true;
        return false;
    }

    const Logout = () => {
        toast.success(`See you again ${user.firstName}`);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken("");
        navigate('/');
    }

    return (
        <userContext.Provider
            value={{
                RegisterUser,
                LoginUser,
                Logout,
                IsLoggedIn,
                user,
                token,
            }}
        >
            {isReady ? children : null}
        </userContext.Provider>
    )
}

export const useAuth = () => {
    if (!userContext) {
        toast.error("User context is null, please add your component within the scope of the provider");
    }
    return useContext(userContext);
}