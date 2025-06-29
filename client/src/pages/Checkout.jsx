import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import confirm from '../utils/confirmLogin';
import CircularProgress from '../components/CircularProgress';
import { motion, useMotionValue } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

export default function Checkout() {
	confirm() ? true : navigate('/login');
	const navigate = useNavigate();
	const notify = (message, ...props) => toast(message, { theme: 'dark', ...props });

	let progress = useMotionValue(90);

	const [cartItems, setCartItems] = useState([]);
	const [confirmed, setConfirmed] = useState(false);

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
			.catch((err) => notify(err.message));
	}, []);

	function confirmPurchase() {
		if (!cartItems.length) return;
		setConfirmed(true);
		axios.post(
			'/api/orders',
			{
				items: cartItems,
				total: cartItems.reduce((acc, item) => acc + item.price, 0),
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		setTimeout(() => {
			navigate('/orders');
		}, 3000);
	}
	return (
		<>
			<div className="text-white py-5 px-3 grid md:grid-cols-7 gap-4">
				<ToastContainer />
				<div className="relative overflow-x-auto md:col-span-4">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3 rounded-tl-lg">
									Name
								</th>
								<th scope="col" className="px-6 py-3 rounded-tr-lg">
									Price
								</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => {
								return (
									<tr key={item.id} className="bg-white dark:bg-gray-800">
										<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{item.name}
										</th>
										<td className="px-6 py-4">${item.price}</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot className="bg-neutral-700">
							<tr className="font-semibold text-gray-200 ">
								<th scope="row" className="px-6 py-3 text-lg rounded-bl-lg ">
									Total
								</th>
								<td className="px-6 py-3 text-lg text-green-400 rounded-br-lg ">${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} </td>
							</tr>
						</tfoot>
					</table>
				</div>

				{/* {!cartItems.length ? () :} */}

				<div
					onClick={confirmPurchase}
					className={
						'md:hidden flex justify-center m-6 font-bold border-2 py-2 px-5 rounded-full ' +
						(!cartItems.length ? 'cursor-not-allowed text-red-500 border-red-500' : 'text-green-500 cursor-pointer border-green-500 hover:bg-green-500 hover:text-neutral-800')
					}>
					<button className={'' + (!cartItems.length ? 'cursor-not-allowed' : '')}>Confirm Purchase</button>
				</div>
				<div className="hidden sticky top-5 md:block md:col-span-3 bg-neutral-800 rounded-lg h-[80vh] ">
					<div className="h-full flex flex-col items-center justify-center ">
						{!confirmed ? (
							<>
								<p className="text-2xl font-bold mb-4">Confirm Purchase</p>
								<div
									onClick={confirmPurchase}
									className={
										'flex justify-center text-green-500 font-bold border-2  py-2 px-5 rounded-full ' +
										(!cartItems.length ? 'cursor-not-allowed text-red-500 border-red-500' : 'cursor-pointer hover:bg-green-500 hover:text-neutral-800 border-green-500')
									}>
									<button className={'' + (!cartItems.length ? 'cursor-not-allowed' : '')}>Confirm</button>
								</div>
							</>
						) : (
							<div>
								<motion.div initial={{ x: 0 }} animate={{ x: 100 }} style={{ x: progress }} transition={{ duration: 1 }} />
								<CircularProgress progress={progress} />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
