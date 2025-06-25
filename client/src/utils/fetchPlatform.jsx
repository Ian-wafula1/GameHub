import axios from "axios";
import { AppContext } from "../context/AppContext";
// import { useContext } from "react";

export default function fetchPlatform({platform_id, setGames}) {
    // const {setGames} = useContext(AppContext)
    axios.get(`https://api.rawg.io/api/games?platforms=${platform_id}&key=6c8e0c847dd14ebd88f23676a432f0fa`)
    .then(res => {
        setGames(res.data.results)
    })
    .catch(err => console.log(err))
    
}