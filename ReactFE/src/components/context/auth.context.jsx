import { createContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        name: "",
    }
});

const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            name: "",
        }
    });

    const [appLoading, setAppLoading] = useState(true);
    
    return (
        <AuthContext.Provider value={{ 
                auth, setAuth, appLoading, setAppLoading
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthWrapper };