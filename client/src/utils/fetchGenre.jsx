import axios from "axios";
import { AppContext } from "../context/AppContext";
// import { useContext } from "react";

export default function fetchGenre({genre, setGames, setTitle}) {
    // const {setGames} = useContext(AppContext)
    setTitle(`${genre} games`)
    axios.get(`https://api.rawg.io/api/games?genres=${genre}&key=6c8e0c847dd14ebd88f23676a432f0fa`)
    .then(res => {
        setGames(res.data.results)
    })
    .catch(err => console.log(err))
    
}