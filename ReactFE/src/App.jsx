import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

function App() {

    const {setAuth, appLoading, setAppLoading} = useContext(AuthContext);

    useEffect(() => {
        const fecthAccount = async () => {
            setAppLoading(true);

            const res = await axios.get(`/v1/api/account`);
            if (res) {
                setAuth({
                    isAuthenticated: true,
                    user: {
                        email: res.user.email,
                        name: res.user.name
                    }
                });
            }
            setAppLoading(false);
        };

        fecthAccount();

    }, []);

    return (
        <>
            {appLoading === true ? 
                <div style = {{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Spin />
                </div>

                :
                 
                <>
                    <Header />
                    <Outlet />
                </>
            }
        </>
    );
}

export default App;
