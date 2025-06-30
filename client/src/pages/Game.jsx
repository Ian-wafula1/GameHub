import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getRandomPrice from '../utils/getRandomPrice';
import confirmLogin from '../utils/confirmLogin';
import { BackArrow } from '../assets/svgCustom';
import { ToastContainer, toast } from 'react-toastify';

let randomPrice = getRandomPrice();

export default function Game() {
	const navigate = useNavigate();
	useEffect(() => {
		confirmLogin() ? true : navigate('/login');
	}, [navigate]);
	let id = useParams();
	id = id?.id;

	if (!id || !localStorage.getItem('token')) {
		navigate('/login');
	}
	const notify = (message, ...props) => toast(message, { theme: 'dark', ...props });

	const [game, setGame] = useState(null);
	const [status, setStatus] = useState({
		purchased: false,
		wishlist: false,
		cart: false,
	});

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`/api/games`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
				let game = res.data?.find((g) => g.api_game_id === id);
				if (game) {
					setStatus((c) => ({ ...c, wishlist: !game.purchased, purchased: game.purchased }));
				}

				const res2 = await axios.get('/api/cart', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
				game = res2.data?.find((g) => g.api_game_id === id);
				if (game) {
					setStatus((c) => ({ ...c, cart: true }));
				}
			} catch (err) {
				notify(err.message);
			}
		})();
	}, [id, setStatus]);

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=6c8e0c847dd14ebd88f23676a432f0fa`);
				setGame(res.data);
			} catch (err) {
				notify(err.message);
			}
		})();
	}, [id]);

	function handleCart(game) {
		if (status.cart || status.purchased) {
			axios
				.delete(`/api/cart/${game.id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(() => {
					setStatus((c) => ({ ...c, cart: false }));
					return;
				});
		} else {
			axios
				.post(
					'/api/cart',
					{
						api_game_id: game.id,
						price: +game.price,
						name: game.name,
						img_url: game.background_image,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				.then((res) => {
					if (res.status == 201) {
						notify(`${game.name} added to cart!`);
						setStatus((c) => ({ ...c, cart: true }));
					}
				})
				.catch((err) => notify(err.message));
		}
	}

	function handleWishlist(game) {
		if (status.wishlist) {
			axios
				.delete(`/api/wishlist/${game.id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(() => {
					notify(`${game.name} removed from wishlist!`);
					setStatus((c) => ({ ...c, wishlist: false }));
					return;
				});
		} else if (status.purchased) {
			notify(`${game.name} already purchased!`);
			return;
		} else {
			axios
				.post(
					'/api/wishlist',
					{
						api_game_id: game.id,
						name: game.name,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				.then((res) => {
					if (res.status == 201) {
						notify(`${game.name} added to wishlist!`);
						setStatus((c) => ({ ...c, wishlist: true }));
					}
				})
				.catch((err) => notify(err.message));
		}
	}
	if (game) game.price = randomPrice;
	return (
		<>
			<ToastContainer />
			<div className="p-5 text-white flex flex-col gap-3">
				<div className="flex justify-between items-center">
					<div onClick={() => navigate(-1)} className="text-gray-300 font-bold flex gap-2 items-center">
						<BackArrow className="fill-gray-200 w-5 h-5" />
						<p>Back</p>
					</div>
					<h1 className="font-bold text-3xl text-right">{game?.name || 'Unlisted'}</h1>
				</div>
				<div className="flex flex-col gap-3">
					{' '}
					<img className="rounded-3xl min-w-[100%] overflow-clip object-cover  min-h-[445px " src={game?.background_image} alt={game?.name || 'Unlisted'} />
					{status.purchased ? (
						<div className="flex justify-between items-center  bg-neutral-800 rounded-xl py-4 px-6">
							<p className="font-bold text-xl text-right text-green-500 m-auto">Already Purchased</p>
						</div>
					) : (
						<>
							<p className="text-xl font-semibold text-right text-green-500">${game?.price || 'Unlisted'}</p>
							<div className="text-center  bg-neutral-800 rounded-xl py-3 px-6">
								<button className={'text-[1.6rem] font-bold ml-auto ' + (status.cart || status.purchased ? 'text-green-400' : '')} onClick={() => handleCart(game)}>
									{status.cart || status.purchased ? 'Added to cart ✓' : 'Add to cart +'}
								</button>
							</div>
							<div className="text-center bg-neutral-800 rounded-xl py-3 px-6">
								<button className={'text-[1.6rem] font-bold ' + (status.wishlist ? 'text-green-400' : '')} onClick={() => handleWishlist(game)}>
									{status.wishlist ? 'Added to wishlist ✓' : 'Add to wishlist +'}
								</button>
							</div>
						</>
					)}
					<div className="bg-neutral-800 rounded-xl p-6 mt-5">
						<p className="font-bold text-3xl mb-2">Description</p>
						<p className="text-lg font-medium text-neutral-200">{game?.description_raw || 'Unlisted'}</p>
					</div>
				</div>
			</div>
		</>
	);
}
