import { useContext } from "react"
import { AppContext } from "../context/AppContext"
// import getRandomPrice from "../utils/getRandomPrice"
import GameCard from "../components/GameCard"

export default function Store() {

    const {games} = useContext(AppContext)
    console.log(games[0]?.name)
    // console.log(games[0] == '[object Object]' ? JSON.parse(games): 'wow such empty')
    console.log(games)
    console.log(games.length)
    return (
        <>
            <h1>Store</h1>
            <div className="game">
                {games.map(game => 
                    <GameCard key={game.id} game={game} />// game.price = getRandomPrice()
                )}
                {/* {games && <GameCard game={games[0]} />} */}
            </div>
        </>
    )
}