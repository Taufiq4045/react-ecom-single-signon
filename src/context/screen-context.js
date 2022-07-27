import { createContext, useContext, useState } from "react";

export const screenContext = createContext({ 
    user: null,
    seller: () => {},
    buyer: () => {},
    logout: () => {},
 });

const USER = { name: 'User Category' };

export function ScreenContextProvider({ children }) {

    const [ user, setUser ] = useState(USER);

    function seller(type) {
        setUser({ name: type});
    }

    function buyer(type) {
        setUser({ name: type});
    }

    function logout() {
        setUser(USER);
    }

    return (
        <screenContext.Provider value={{user, seller, buyer, logout }}>{ children }</screenContext.Provider>
    )
}

export function useScreenContext() {
    const { user, seller, buyer, logout } = useContext(screenContext);

    return {user, seller, buyer, logout };
}