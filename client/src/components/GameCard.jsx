import { useNavigate } from "react-router-dom"

export default function GameCard({game}) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/game/${game.id}`)
    }

    return (
        <div onClick={handleClick}>
            <h1>{game.name || 'Unlisted'}</h1>
            <p>Platforms: {game?.parent_platforms?.map(platform => platform.name)?.join(', ') || 'Unlisted'}</p>
            <p>Genre: {game?.genres?.map(genre => genre.name)?.join(', ') || 'Unlisted'}</p>
            <p>Rating: {game.rating || 'Unlisted'}</p>
            <p>Release Date: {game.released || 'Unlisted'}</p>
        </div>
    )
}