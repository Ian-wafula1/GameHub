import { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate()
	const [cartItems, setCartItems] = useState([]);

    if (!localStorage.getItem('token')) {
        navigate('/login')
    }
	useEffect(() => {
		axios
			.get('/api/cart')
			.then((res) => {
				setCartItems(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{cartItems.map(async (item) => {
                const price = item.price
                item = await axios.get(`https://api.rawg.io/api/games/${item.api_game_id}?key=6c8e0c847dd14ebd88f23676a432f0fa`)
                item.price = price
				return <CartItem item={item.data} />
			})}
            <button onClick={() => navigate('/checkout')}>Proceed to checkout</button>
		</div>
	);
}
