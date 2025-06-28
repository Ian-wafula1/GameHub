import OrderItem from '../components/OrderItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import confirmLogin from '../utils/confirmLogin';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
	const navigate = useNavigate();
	useEffect(() => {
			confirmLogin() ? true : navigate('/login')
	}, [navigate])

	let [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get('/api/orders', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
                console.log(res.data)
				setOrders(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
    console.log(orders)
    orders = orders?.filter((order) => order.status !== 'pending')
	return (
		<>
			<h1>Orders</h1>
			<div>
				{orders?.map((order) => {
					return <OrderItem key={order.id} order={order} />;
				})}
			</div>
		</>
	);
}
