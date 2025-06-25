import axios from "axios";

export default function fetchSaved({url, setGames ,setTitle}) {
    setTitle(`Your ${url}`)
    axios.get(`/api/${url}`)
    .then(res => {
        setGames(res.data)
    })
    .catch(err => console.log(err))
}