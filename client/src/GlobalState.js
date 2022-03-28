import React, {createContext, useState, useEffect, useDebugValue} from "react";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoryAPI";
import axios from "axios";
export const GlobalState = createContext();

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);
    
    useEffect(()=>{
        const refreshToken = async() =>{
            const res = await axios.get('/user/refresh_token')
            setToken(res.data.accesstoken);
        }
        refreshToken();
    },[])
    const state={
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}