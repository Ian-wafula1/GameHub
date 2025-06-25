import getRandomPrice from "../utils/getRandomPrice"

export default function GameCard({game}) {
    return (
        <div>
            <h1>{game.name || 'Unlisted'}</h1>
            <p>Platforms: {game?.parent_platforms?.map(platform => platform.name)?.join(', ') || 'Unlisted'}</p>
            <p>Price: ${game.price || getRandomPrice()}</p>
            <p>Genre: {game?.genres?.map(genre => genre.name)?.join(', ') || 'Unlisted'}</p>
            <p>Rating: {game.rating || 'Unlisted'}</p>
            <p>Release Date: {game.released || 'Unlisted'}</p>
        </div>
    )
}