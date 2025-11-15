import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [message, setMessage] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [selected, setSelected] = useState(null);
    const [createLod, setCreateLod] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchResponse(){
        if(prompt === "") return alert("Give some Prompt");
        setNewRequestLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAeauefSJXs76BTc6F3qg-Tc2o-ieNjubU",
                method: "post",
                data: {
                    contents: [{ parts: [{ text: prompt }] }],
                },
            })

            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            };

            setMessage((prev) => [...prev, message]);
            setNewRequestLoading(false);

            const { data } = await axios.post(`${server}/api/chat/${selected}`,
                {
                    question: prompt,
                    answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    }
                }
            );
        } catch (error) {
            alert("something went wrong");
            console.log(error);
            setNewRequestLoading(false);
        }
    }

    async function fetchChats() {
        try {
            const { data } = await axios.get(`${server}/api/chat/get`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
            setChats(data);
            setSelected(data[0]._id);
        } catch (error) {
            console.log(error);
        }
    }

    async function createChats() {
        setCreateLod(true);
        try {
            const { data } = await axios.post(`${server}/api/chat/create`, {},
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            fetchChats();
            setCreateLod(false);
        } catch (error) {
            toast.error("something went wrong");
            setCreateLod(false);
        }
    }

    async function fetchMessages() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMessage(data);
            setLoading(false); 
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function deleteChat(id) {
        try {
            const { data } = await axios.delete(`${server}/api/chat/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
            toast.success(data.message);
            fetchChats();
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }

    useEffect(() => {
        fetchChats()
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selected]);

    return (
        <ChatContext.Provider value={{
            fetchResponse,
            message,
            prompt,
            setPrompt,
            newRequestLoading,
            chats,
            createChats,
            createLod,
            selected,
            setSelected,
            loading,
            setLoading,
            deleteChat,
            fetchChats
        }}>
            {children}
            <Toaster />
        </ChatContext.Provider>
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };