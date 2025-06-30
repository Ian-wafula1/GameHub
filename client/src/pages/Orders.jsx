import OrderItem from '../components/OrderItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import confirmLogin from '../utils/confirmLogin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Orders() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!confirmLogin()) navigate('/login');
		else {
			axios
				.get('/api/orders', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then((res) => {
					setOrders(res.data);
				})
				.catch((err) => notify(err.message));
		}
	}, [navigate]);

	const notify = (message, ...props) => toast(message, { theme: 'dark', ...props });

	let [orders, setOrders] = useState([]);

	orders = orders?.filter((order) => order.status !== 'pending');
	return (
		<>
			<ToastContainer />
			<div className="flex flex-col gap-5 text-white py-3 px-5">
				<h1 className="text-3xl font-bold">Orders</h1>
				<div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(360px,1fr))] ">
					{orders?.map((order) => {
						return <OrderItem key={order.id} order={order} />;
					})}
				</div>
			</div>
		</>
	);
}
