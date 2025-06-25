import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game(){
    const id = useParams()
    const navigate = useNavigate()

    if (!id || !localStorage.getItem('token')) {
        navigate('/login')
    }

    const [game, setGame] = useState(null)
    const [status, setStatus] = useState({
        purchased: false,
        wishlist: false,
        cart: false
    })

    useEffect( () => {
        return (async () => {
        try {
            const res = await axios.get(`/api/games`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            // const res2 = await axios.get('/api/cart')
            // const game = [...res2.data, ...res.data]?.find(g => g.api_game_id === id)
            let game = res.data?.find(g => g.api_game_id === id)
            if (game){
                setStatus(prev => {
                    return {
                        ...prev,
                        purchased: game.purchased,
                        wishlist: !game.purchased,
                    }
                })
                return
            }

            const res2 = await axios.get('/api/cart', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            game = res2.data?.find(g => g.api_game_id === id)
            if (game){
                setStatus(prev => {
                    return {
                        ...prev,
                        cart: true
                    }
                })
                return
            }
        } catch (err) {
            console.log(err)
        }})()
    }, [id])

    useEffect(() => {
        return (async () => {
            try {
            const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=6c8e0c847dd14ebd88f23676a432f0fa`)
            setGame(res.data)
        } catch (err) {
            console.error(err)
        }
        })()
    }, [game, id])

    function addToCart(game) {
        // const game = games.find(g => g.id === gameId);
        // cart.push(game);
        // localStorage.setItem('cart', JSON.stringify(cart));
        // alert('${game.name} added to cart!');
        if (status.cart || status.purchased){
            console.log(`${game.name} already in cart!`)
            return
        }
        axios.post('/api/cart', {
            api_game_id: game.id,
            price: game.price,
            name: game.name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status == 201) {
                console.log(`${game.name} added to cart!`)
                setStatus(prev => {
                    return {
                        ...prev,
                        cart: true
                    }
                })
            }
        }).catch(err => console.log(err))
    }

    function addToWishlist(game) {
        if (status.wishlist ){
            console.log(`${game.name} already in wishlist!`)
            return
        } else if (status.purchased){
            console.log(`${game.name} already purchased!`)
            return
        }
        axios.post('/api/wishlist', {
            api_game_id: game.id,
            price: game.price,
            name: game.name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status == 201) {
                console.log(`${game.name} added to wishlist!`)
                setStatus(prev => {
                    return {
                        ...prev,
                        wishlist: true
                    }
                })
            }
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <img src={game.background_image} alt={game.name} />
            <h1>{game.name || 'Unlisted'}</h1>
            <p>Description: {game.description_raw || 'Unlisted'}</p>
            <p>Website: {game.website || 'Unlisted'}</p>
            <p>Released: {game.released || 'Unlisted'}</p>
            <p>Genres: {game.genres?.map(genre => genre.name)?.join(', ') || 'Unlisted'}</p>
            <p>Platforms: {game?.parent_platforms?.map(platform => platform.name)?.join(', ') || 'Unlisted'}</p>
            <p>Developers: {game?.developers?.map(developer => developer.name)?.join(', ') || 'Unlisted'}</p>
            <p>Publishers: {game?.publishers?.map(publisher => publisher.name)?.join(', ') || 'Unlisted'}</p>

            <button className={status.cart || status.purchased ? 'disabled' : ''} onClick={() => addToCart(game)}>Add to cart</button>
            <button className={status.wishlist || status.purchased ? 'disabled' : ''} onClick={() => addToWishlist(game)}>Add to wishlist</button>
        </div>
    )
}