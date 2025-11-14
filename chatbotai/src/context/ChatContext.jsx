import axios from "axios";
import { createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [message, setMessage] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);

    async function fetchResponse(){
        setNewRequestLoading(true);
        setPrompt("");
        try {
            const responser = await axios({})
        } catch (error) {
            
        }
    }

    return (
        <ChatContext.Provider value={{}}>
            {children}
            <Toaster />
        </ChatContext.Provider>
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };