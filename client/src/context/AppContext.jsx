import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([])
    return <AppContext.Provider value={{ searchTerm, setSearchTerm, games, setGames }} >{children}</AppContext.Provider>
}

export { AppContext, AppProvider }