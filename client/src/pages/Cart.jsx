import { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import confirmLogin from '../utils/confirmLogin';
import {ArrowRightCircle} from 'lucide-react'
import { BackArrow } from '../assets/svgCustom';


export default function Cart() {
	const navigate = useNavigate();
	useEffect(() => {
		confirmLogin() ? true : navigate('/login');
	}, [navigate]);
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

	function deleteFromCart(id) {
		console.log(id)
        axios.delete(`/api/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(() => {
            // cartItems.filter((item) => item.id !== id);
			setCartItems(c => c.filter((item) => item.id !== id))
        }).catch((err) => console.log(err));
    }
	return (
		<div className="text-white flex flex-col gap-5 px-4">
			<div>
				<div onClick={() => navigate(-1)} className="text-gray-300 font-bold flex gap-2 items-center">
					<BackArrow className="fill-gray-200 w-5 h-5" />
					<p>Back</p>
				</div>
			<h1 className="text-5xl font-bold text-right">Cart</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-5">
				<div className=" flex flex-col gap-4 col-span-3">
					{cartItems.map((item) => {
						return <CartItem onDelete={deleteFromCart} key={item?.id} item={item} />;
					})}
					{cartItems.length ? (
						<div className='self-center flex items-center group gap-2 border-2 border-green-400 hover:bg-green-100 hover:bg-opacity-10 focus:ring-2 cursor-pointer rounded-full py-3 px-5' onClick={() => navigate('/checkout')}>
						<p className='font-bold text-green-400 group-hover:text-white' >Proceed to checkout</p>
						<ArrowRightCircle className='relative top-[2px]' size={20} color='#4ade80' />
					</div>
					)
				:
				(
					<div disabled className='self-center flex items-center group gap-2 border-2 border-red-400 hover:bg-red-100 hover:bg-opacity-10 focus:ring-2 cursor-not-allowed rounded-full py-3 px-5'>
						<p className='font-bold text-red-400 group-hover:text-white' >Cart is empty</p>
					</div>
				)}
				</div>	
				<div className="hidden md:flex flex-col items-center justify-center col-span-2 border-2 border-neutral-700 rounded-xl">
					<svg
						className={cartItems.length ? 'fill-green-500' : 'fill-red-500'}
						height="200px"
						width="200px"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 60.013 60.013"
						xmlSpace="preserve">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							{' '}
							<path d="M11.68,12.506l-0.832-5h-2.99c-0.447-1.72-1.999-3-3.858-3c-2.206,0-4,1.794-4,4s1.794,4,4,4c1.859,0,3.411-1.28,3.858-3 h1.294l0.5,3H9.624l0.222,1.161l0,0.003c0,0,0,0,0,0l2.559,13.374l1.044,5.462h0.001l1.342,7.015 c-2.468,0.186-4.525,2.084-4.768,4.475c-0.142,1.405,0.32,2.812,1.268,3.858c0.949,1.05,2.301,1.652,3.707,1.652h2 c0,3.309,2.691,6,6,6s6-2.691,6-6h11c0,3.309,2.691,6,6,6s6-2.691,6-6h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4.35 c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4h-11.7c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4H15 c-0.842,0-1.652-0.362-2.224-0.993c-0.577-0.639-0.848-1.461-0.761-2.316c0.152-1.509,1.546-2.69,3.173-2.69h0.781 c0.02,0,0.038,0,0.06,0l6.128-0.002L33,41.501v-0.001l7.145-0.002L51,41.496v-0.001l4.024-0.001c2.751,0,4.988-2.237,4.988-4.987 V12.494L11.68,12.506z M4,10.506c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S5.103,10.506,4,10.506z M46,45.506 c2.206,0,4,1.794,4,4s-1.794,4-4,4s-4-1.794-4-4S43.794,45.506,46,45.506z M23,45.506c2.206,0,4,1.794,4,4s-1.794,4-4,4 s-4-1.794-4-4S20.794,45.506,23,45.506z M58.013,21.506H51v-7.011l7.013-0.002V21.506z M42,39.498v-6.991h7v6.989L42,39.498z M42,30.506v-7h7v7H42z M24,39.503v-6.997h7v6.995L24,39.503z M24,30.506v-7h7v7H24z M13.765,23.506H22v7h-6.895L13.765,23.506z M49,21.506h-7v-7h7V21.506z M40,21.506h-7V14.5l7-0.002V21.506z M31,14.506v7h-7v-7H31z M33,23.506h7v7h-7V23.506z M51,23.506h7v7 h-7V23.506z M22,14.504v7.003h-8.618l-1.34-7L22,14.504z M15.487,32.506H22v6.997l-5.173,0.002L15.487,32.506z M33,32.506h7v6.992 L33,39.5V32.506z M55.024,39.494L51,39.495v-6.989h7.013v4C58.013,38.154,56.672,39.494,55.024,39.494z"></path>{' '}
						</g>
					</svg>
					<div className={'relative left-4 grid place-items-center rounded-full w-14 h-14 ' + (cartItems.length ? 'bg-green-700' : 'bg-red-700')}>
						<p className="font-bold text-3xl">{cartItems.length}</p>
					</div>
				</div>
				
			</div>
		</div>
	);
}
