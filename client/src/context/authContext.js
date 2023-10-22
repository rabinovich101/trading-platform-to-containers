import { createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
const { REACT_APP_LOCAL_3003 } = process.env;

function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("user"));
    const [auth, setAuth] = useState(null);
    const checkAuth = async (token) => {
        const res = await axios.post('api/v1/auth', {},{ headers: { Authorization: `Bearer ${token}` } });
        
        res.data ? setAuth(true) : setAuth(false);
      };
    useEffect(() => {
        setToken(c => c = localStorage.getItem("user"));
        checkAuth(token);
    }, [token,auth]);
   
    return (
        <AuthContext.Provider value={{auth, checkAuth, token}}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContextProvider };
export default AuthContext;

