import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {

    // const [token, setToken] = useState("");
    // const [cocineros, setCocineros] = useState([]);

    // useEffect(() => {
    //     const URL = "http://localhost:3000/api/cocineros";
    //     const traerCategorias = async () => {
    //         try {
    //             const res = await axios.get(URL);
    //             setCocineros([...res.data]);

    //         } catch (err) {

    //         }
    //     }
    //     traerCategorias();
    // }, [])



    return (
        <TokenContext.Provider
            value={{
                token: localStorage.getItem('token') || "",
                // cocineros:cocineros
            }}
        >
            {children}
        </TokenContext.Provider>
    )


}

export default TokenProvider;