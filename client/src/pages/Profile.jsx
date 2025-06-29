import confirmLogin from '../utils/confirmLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getRandomHexColor from '../utils/getRandomHex';
import { AddIcon, EditIcon } from '../assets/svgCustom';
import FriendCard from '../components/FriendCard';

export default function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	useEffect(() => {
		confirmLogin() || navigate('/login');
	}, [navigate]);

	useEffect(() => {
		axios
			.get('/api/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
			.then((res) => {
				setUser(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	function handleClick() {
		// navigate('/edit-profile');
        console.log('clicked')
	}

	return (
		<div className='text-white py-4 px-8 flex flex-col gap-4 md:grid md:grid-cols-[2fr,3fr] md:gap-x-[3rem]'>
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
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 items-center">
						<p className="text-xl font-bold">Bio</p>
						<EditIcon className={'w-4 h-4 relative top-[2px]'} onClick={handleClick} />
					</div>
					<p className="py-3 px-4 rounded-xl bg-neutral-700">{user?.profile?.bio || "This user hasn't written a bio yet. Mysterious. Enigmatic. Possibly a secret agent. Or maybe they just forgot. We may never know..."}</p>
				</div>
			</div>
			<div className='flex flex-col gap-5 '>
                <div className="flex gap-2 items-center">
                    <h2 className='text-3xl font-bold'>Friends</h2>
                    <AddIcon className={'w-5 h-5 stroke-green-600 relative top-[2px] cursor-pointer'} />
                </div>
                <div className='md:grid md:grid-cols-2'>
                    {user.friends?.map(user => <FriendCard key={user.id} user={user} />)}
                </div>
            </div>
		</div>
	);
}
