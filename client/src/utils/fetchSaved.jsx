import axios from "axios";

export default async function fetchSaved({url, setGames ,setTitle}) {
    setTitle(`Your ${url}`)
    let games = await axios.get(`/api/${url}`)
    games = games.data
    let fetchedGames = []
    games.forEach(game => {
        axios.get(`/api/games/${game.api_game_id}`)
        .then(res => {
            fetchedGames.push(res.data)
            if (fetchedGames.length === games.length) {
                setGames(fetchedGames)
            }
        })
        .catch(err => console.log(err))
    })
    // .then(res => {
    //     setGames(res.data)
    // })
    // .catch(err => console.log(err))
}