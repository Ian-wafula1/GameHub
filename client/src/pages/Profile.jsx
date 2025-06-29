import confirmLogin from '../utils/confirmLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getRandomHexColor from '../utils/getRandomHex';
import { AddIcon, CloseIcon, EditIcon } from '../assets/svgCustom';
import FriendCard from '../components/FriendCard';
import Modal from 'react-modal';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = '#00000080';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   },
// };

export default function Profile() {
	const [modalIsOpen, setIsOpen] = useState({
		model1: false,
		model2: false,
	});
	function openModal1() {
		setIsOpen((x) => ({ ...x, model1: true }));
	}

	function closeModal1() {
		setIsOpen((x) => ({ ...x, model1: false }));
	}

	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [users, setUsers] = useState([]);
	console.log(users);
	useEffect(() => {
		if (!confirmLogin()) {
			navigate('/login');
		} else {
			axios
				.get('/api/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
				.then((res) => {
					setUser(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));

			axios
				.get('/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
				.then((res) => {
					setUsers(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [navigate]);

	function handleClick() {
		console.log('clicked');
	}

	function logout() {
		localStorage.removeItem('token');
		navigate('/');
	}

	function addFriend(friend) {
		axios
			.post('/api/friends', { friend }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((res) => {
				console.log(res);
				setIsOpen((x) => ({ ...x, model1: false }));
				// setUser(res.data)
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="text-white py-4 px-8 flex flex-col gap-4 md:grid md:grid-cols-[2fr,3fr] md:gap-x-[3rem]">
			<div className="bg-neutral-800 p-5 rounded-2xl">
				<div className="px-8 py-10 flex flex-col items-center gap-3">
					<div className="w-[70%] group relative ">
						<img className="cursor-pointer rounded-full w-full group-hover:opacity-25" src={user?.profile?.avatar_url || `https://ui-avatars.com/api/?name=${user?.username?.at(0)}&background=${getRandomHexColor()}&format=svg`} alt="" />
						<EditIcon className={'hidden group-hover:block absolute m-auto inset-0 w-12 h-12'} onClick={handleClick} />
					</div>
					<h1 className="text-3xl font-bold flex items-center gap-2">
						<p>{user?.username}</p>
						<EditIcon onClick={handleClick} className={'w-4 h-4 relative top-[4px]'} />
					</h1>
					<div className="text-gray-400 flex items-center gap-2">
						<p>{user?.email}</p>
						<EditIcon onClick={handleClick} className={'w-3 h-3'} />
					</div>
					<div onClick={logout} className="active:bg-opacity-75 cursor-pointer bg-red-600 border-2 border-neutral-950 px-6 py-1 rounded-xl ">
						<p>Log out</p>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 items-center">
						<p className="text-xl font-bold">Bio</p>
						<EditIcon className={'w-4 h-4 relative top-[2px]'} onClick={handleClick} />
					</div>
					<p className="py-3 px-4 rounded-xl bg-neutral-700">{user?.profile?.bio || "This user hasn't written a bio yet. Mysterious. Enigmatic. Possibly a secret agent. Or maybe they just forgot. We may never know..."}</p>
				</div>
			</div>
			<div className="flex flex-col gap-5 ">
				<div className="flex gap-2 items-center">
					<h2 className="text-3xl font-bold">Friends</h2>
					<AddIcon onClick={openModal1} className={'w-5 h-5 stroke-green-600 relative top-[2px] cursor-pointer'} />
					<Modal className={'relative text-white p-5 bg-neutral-800 rounded-2xl w-[70%] h-[60%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} isOpen={modalIsOpen.model1} onRequestClose={closeModal1} contentLabel="Add Friends">
						<CloseIcon className={'absolute top-3 right-3  w-8 h-8 cursor-pointer stroke-red-600'} onClick={closeModal1} />
						<div className="flex flex-col gap-5">
							<h2 className="text-3xl font-bold self-center">Add Friend</h2>

							<div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
								<div className="flex justify-between items-center">
									{users?.filter(x => {
                                        return !user.friends?.find(y => y.username === x.username) 
                                    })?.map((x) => (
										<>
											<FriendCard key={x.id} friend={x} />
											<button className="bg-green-600 px-4 py-1 active:bg-opacity-75 text-sm rounded-md" onClick={() => addFriend(user)}>
												Add
											</button>
										</>
									))}
									{/* <FriendCard friend={user} />
									<button className="bg-green-600 px-4 py-1 active:bg-opacity-75 text-sm rounded-md" onClick={() => addFriend(user)}>
										Add
									</button> */}
								</div>
							</div>
						</div>
						{/* <button onClick={closeModal1}>close</button> */}
					</Modal>
				</div>
				<div className="md:grid md:grid-cols-2">
					{user.friends?.map((user) => (
						<FriendCard key={user.id} user={user} />
					))}
				</div>
			</div>
		</div>
	);
}
