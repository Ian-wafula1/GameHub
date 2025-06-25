import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import getRandomPrice from "../utils/getRandomPrice"
import GameCard from "../components/GameCard"
import fetchPlatform from "../utils/fetchPlatform"
import fetchGenre from "../utils/fetchGenre"
import fetchTop from "../utils/fetchTop"
import { useNavigate } from "react-router-dom"

const platforms = [['PC', 4], ['PlayStation 5', 187], ['PlayStation 4', 18], ['Xbox', 1], ['Nintendo Switch', 7], ['iOS', 3], ['Android', 21]]
const genres = ['action', 'strategy', 'rpg', 'shooter', 'adventure', 'puzzle', 'racing', 'sports']

export default function Store() {

    const navigate = useNavigate()
    const {games, setGames} = useContext(AppContext)
    return (
        <>
            <h1>Store</h1>
            <aside>
                <button onClick={() => navigate('/library')}>Library</button>
                <button onClick={() => navigate('/wishlist')}>Wishlist</button>
                <button onClick={() => fetchTop({platform_id: 4, setGames})}>Best of all time</button>
                {platforms.map(x => 
                    <button key={x[0]} onClick={() => fetchPlatform({platform_id: x[1], setGames})}>{x[0]}</button>
                )}
                {genres.map(x => 
                    <button key={x} onClick={() => fetchGenre({genre: x, setGames})}>{x}</button>
                )}
            </aside>
            <div className="game">
                {games.map(game => {
                    game.price = getRandomPrice()
                    return <GameCard key={game.id} game={game} />
                })}
            </div>
        </>
    )
}