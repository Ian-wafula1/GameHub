import { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import confirmLogin from '../utils/confirmLogin';

export default function Cart() {
	const navigate = useNavigate();
	useEffect(() => {
			confirmLogin() ? true : navigate('/login')
		}, [navigate])
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		axios
			.get('/api/cart', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setCartItems(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
    console.log(cartItems)
	return (
		<>
			<h1>Cart</h1>
			<div>
				{cartItems.map( (item) => {
					return <CartItem key={item?.id} item={item} />;
				})}
				<button onClick={() => navigate('/checkout')}>Proceed to checkout</button>
			</div>
		</>
	);
}
