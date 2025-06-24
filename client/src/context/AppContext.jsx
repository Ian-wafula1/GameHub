import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    return <AppContext.Provider value={{ searchTerm, setSearchTerm }} >{children}</AppContext.Provider>
}

export { AppContext, AppProvider }