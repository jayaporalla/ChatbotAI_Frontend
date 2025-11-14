import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { server } from "../main";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [btnLoading, setBtnLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loginUser( email, navigate ){
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email });
            toast.success(data.message);
            localStorage.setItem("verifyToken", data.verifyToken);
            navigate("/verify");
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function verifyUser( otp, navigate, fetchChats ){
        const verifyToken = localStorage.getItem("verifyToken");
        setBtnLoading(true);

        if(!verifyToken) return toast.error("Please give token");

        try {
            const { data } = await axios.post(`${server}/api/user/verify`, { otp, verifyToken });
            toast.success(data.message);
            localStorage.clear();
            localStorage.setItem("token", data.token);
            navigate("/");
            setBtnLoading(false);
            setIsAuth(true);
            setUser(data.user);
            fetchChats();
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function fetchUser(){
        try {
            const { data } = await axios.get(`${server}/api/user/get`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            })
            setIsAuth(true);
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    }

    const logoutHandler = (navigate) => {
        localStorage.clear();
        toast.success("Logged Out Successfully");
        setIsAuth(false);
        setUser([]);
        navigate("/login");
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <UserContext.Provider 
        value={{ 
            loginUser, 
            btnLoading,
            verifyUser,
            isAuth,
            setIsAuth,
            user,
            loading,
            logoutHandler
        }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };