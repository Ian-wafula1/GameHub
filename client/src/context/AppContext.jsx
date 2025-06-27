import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([])
	const [title, setTitle] = useState('');

    return <AppContext.Provider value={{ searchTerm, setSearchTerm, games, setGames, title, setTitle }} >{children}</AppContext.Provider>
}

export { AppContext, AppProvider }