import OrderItem from '../components/OrderItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
	const navigate = useNavigate();
	if (!localStorage.getItem('token')) {
		navigate('/login');
	}

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get('/api/orders', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setOrders(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<h1>Orders</h1>
			<div>
				{orders.map((order) => {
					return <OrderItem order={order} />;
				})}
			</div>
		</>
	);
}
